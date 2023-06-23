import responseHandler from '../handler/responseHandler.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import Voucher from '../models/Voucher.js'
import { calculateProductRevenue, generateUniqueOrderCode, updateProductQuantities } from '../utils/const.js'

// export const createOrder = async (req, res) => {
//     try {
//         const { products, voucherCode } = req.body
//         const { _id: userId } = req.user
//         let orderCode = nanoid(10)
//         let existOrderId = await Order.findOne({ orderCode })

//         for (const productId of products) {
//             const product = await Product.findById(productId.productId._id)
//             if (!product || product.quantity <= 0) {
//                 return res.status(400).json({ message: 'Sản phẩm không có sẵn trong cửa hàng' })
//             }
//             await Product.findByIdAndUpdate(productId.productId._id, { $inc: { quantity: -productId.quantity } })
//         }

//         if (voucherCode) {
//             // Kiểm tra xem voucher đã hết lượt sử dụng hay chưa
//             const voucher = await Voucher.findOne({ voucherCode })
//             if (voucher.used === voucher.total) {
//                 console.log('Voucher đã được sử dụng hết')
//             } else {
//                 await Voucher.findOneAndUpdate({ voucherCode }, { $inc: { used: 1 } })
//             }
//         }

//         while (existOrderId) {
//             orderCode = nanoid(10)
//             existOrderId = await Order.findOne({ orderCode })
//         }

//         const newOrder = Order({
//             ...req.body,
//             orderCode,
//             userId
//         })
//         await newOrder.save()

//         const existingUser = await User.findById(userId)
//         if (existingUser) {
//             existingUser.ordersCount.push(orderCode)
//             await existingUser.save()
//         }
//         responseHandler.success(res, newOrder)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const createOrder = async (req, res) => {
    try {
        const { products, voucherCode } = req.body
        const { _id: userId } = req.user

        const orderCode = await generateUniqueOrderCode()

        await updateProductQuantities(products)

        if (voucherCode) {
            const voucher = await Voucher.findOne({ voucherCode })
            if (voucher.used === voucher.total) {
                res.status(400).json('Voucher đã được sử dụng hết')
            } else {
                await Voucher.findOneAndUpdate({ voucherCode }, { $inc: { used: 1 } })
            }
        }

        const newOrder = Order({
            ...req.body,
            orderCode,
            userId
        })
        await newOrder.save()

        const existingUser = await User.findById(userId)
        if (existingUser) {
            existingUser.ordersCount.push(orderCode)
            await existingUser.save()
        }

        responseHandler.success(res, newOrder)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getOrderByUserId = async (req, res) => {
    const { _id: userId } = req.user
    const { limit, page } = req.query
    const options = {
        limit: parseInt(limit, 10) || 5,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const orders = await Order.paginate({ userId }, options)
        if (!orders) res.status(200).json({ message: 'Chưa có đơn hàng nào được đặt' })
        responseHandler.success(res, orders)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getOrderByOrderCode = async (req, res) => {
    const { orderCode } = req.body
    try {
        const order = await Order.findOne({ orderCode })
        if (!order) return res.status(404).json({ message: 'Mã đơn hàng không tồn tại ' })
        responseHandler.success(res, order)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { orderCode, status, month, year, isPaid } = req.body

        const order = await Order.findOne({ orderCode }).populate('products.productId')
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' })
        }
        if (status === 'delivered' && isPaid) {
            for (const product of order.products) {
                const existProduct = await Product.findById(product.productId)
                const monthYearKey = `${month}-${year}`
                const revenue = calculateProductRevenue(existProduct.price, product.quantity)
                existProduct.monthlyRevenue.set(monthYearKey, revenue)
                await existProduct.save()
            }
        }
        const updateOrder = await Order.findOneAndUpdate({ orderCode }, { status, isPaid }, { new: true })
        res.status(200).json(updateOrder)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deletedOrderById = async (req, res) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ status: false, message: 'SelectedIds chưa được định nghĩa!' })
        const checkIds = await Order.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return responseHandler.notFound(res)
        await Order.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'Danh sách order được chọn đã bị xóa' })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAllOrderByAdmin = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const orders = await Order.paginate({}, options)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
    }
}

export const cancelOrderByUser = async (req, res) => {
    const { orderCode } = req.body
    const userId = req.user._id
    try {
        // Tìm đơn hàng và tải thông tin người dùng liên quan
        const order = await Order.findOne({ orderCode }).populate('userId')
        if (!order) return res.status(404).json({ message: 'Đơn hàng không tồn tại!' })
        if (order.isPaid || order.status === 'cancel') {
            return res.status(400).json({ message: 'Không thể hủy đơn hàng!' })
        }
        // // Cập nhật thông tin người dùng
        const user = await User.findByIdAndUpdate(userId, { $inc: { totalCancel: 1 } })

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại!' })
        }
        order.status = 'cancel'
        await order.save()
        res.status(200).json('Hủy đơn hàng thành công')
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const cancelOrderByAdmin = async (req, res) => {
    const { orderCode } = req.body
    try {
        const order = await Order.findOne({ orderCode })
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại!' })
        } else {
            if (order.isPaid) return res.status(400).json({ message: 'Không thể hủy đơn đã thanh toán!' })
            if (order.status === 'cancel') return res.status(400).json('Đơn hàng đã ở trạng thái hủy')

            await User.findByIdAndUpdate(order.userId, { $inc: { totalCancel: 1 } })

            order.status = 'cancel'
            await order.save()
            res.status(200).json('Hủy đơn hàng thành công')
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

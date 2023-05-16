import responseHandler from '../handler/responseHandler.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Voucher from '../models/Voucher.js'
import { generateUniqueOrderCode, updateProductQuantities } from '../utils/const.js'

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
                console.log('Voucher đã được sử dụng hết')
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
    const userId = req.user._id
    const orderCode = req.body.orderCode

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Không có trường nào được cập nhật' })
    }

    try {
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' })

        const order = await Order.findOne({ orderCode })
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' })

        if (userId.equals(order.userId) || user.isAdmin) {
            const updateOps = req.body
            const updatedOrder = await Order.findOneAndUpdate(orderCode, { $set: updateOps }, { new: true })
            responseHandler.success(res, updatedOrder)
        } else {
            return res.status(401).json({ message: 'Bạn không có quyền cập nhật đơn hàng của người khác!' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
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

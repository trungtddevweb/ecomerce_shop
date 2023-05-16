import responseHandler from '../handler/responseHandler.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import { nanoid } from 'nanoid'
import Voucher from '../models/Voucher.js'

export const createOrder = async (req, res) => {
    try {
        const { products, voucherCode } = req.body
        const { _id: userId } = req.user
        let orderCode = nanoid(10)
        let existOrderId = await Order.findOne({ orderCode })

        for (const productId of products) {
            const product = await Product.findById(productId.productId._id)
            console.log(productId.productId)
            if (!product || product.quantity <= 0) {
                return res.status(400).json({ message: 'Sản phẩm không có sẵn trong cửa hàng' })
            }
            await Product.findOneAndUpdate({ _id: productId._id }, { $inc: { quantity: -1 } })
        }

        if (voucherCode) {
            await Voucher.findOneAndUpdate({ voucherCode, used: { $lt: { $total: 1 } } }, { $inc: { used: 1 } })
        }

        while (existOrderId) {
            orderCode = nanoid(10)
            existOrderId = await Order.findOne({ orderCode })
        }

        const newOrder = Order({
            ...req.body,
            orderCode,
            userId
        })
        await newOrder.save()
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

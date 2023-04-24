import responseHandler from '../handler/responseHandler.js'
import Order from '../models/Order.js'
import { nanoid } from 'nanoid'

export const createOrder = async (req, res) => {
    try {
        const { _id: userId } = req.user
        let orderCode = nanoid(10)
        let existOrderId = await Order.findOne({ orderCode })

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
        res.status(500).json({ message: error })
    }
}

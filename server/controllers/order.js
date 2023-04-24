import responseHandler from '../handler/responseHandler.js'
import Order from '../models/Order.js'
import nanoId from 'nanoid'

export const createOrder = async (req, res) => {
    try {
        const { _id: userId } = req.user
        let orderId = nanoId(10)
        let existOrderId = await Order.findOne({ orderId })

        while (existOrderId) {
            orderId = nanoId(10)
            existOrderId = await Order.findOne({ orderId })
        }
        const newOrder = Order({
            ...req.body,
            orderId,
            userId
        })
        await newOrder.save()
        responseHandler.success(res, newOrder)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

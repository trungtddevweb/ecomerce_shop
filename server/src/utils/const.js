import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { nanoid } from 'nanoid'

export const optionsMessage = {
    messages: {
        'any.required': '{{#label}} không được bỏ trống'
    }
}

// Create Order
export const generateUniqueOrderCode = async () => {
    let orderCode = nanoid(10)
    let existOrderId = await Order.findOne({ orderCode })

    while (existOrderId) {
        orderCode = nanoid(10)
        existOrderId = await Order.findOne({ orderCode })
    }

    return orderCode
}

export const isProductAvailable = async productId => {
    const product = await Product.findById(productId)
    return product && product.quantity > 0
}

export const updateProductQuantities = async products => {
    const updateOperations = products.map(async productId => {
        const product = await Product.findById(productId.productId._id)
        if (!product || product.quantity <= 0) {
            throw new Error('Sản phẩm không có sẵn trong cửa hàng')
        }
        return Product.findByIdAndUpdate(productId.productId._id, {
            $inc: { quantity: -productId.quantity }
        })
    })

    await Promise.all(updateOperations)
}

export const calculateProductRevenue = (price, quantity) => {
    return price * quantity
}

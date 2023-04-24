import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const OrderSchema = new Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                size: { type: String, required: true },
                color: { type: String, required: true },
                sumPrice: { type: Number, required: true },
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            phoneNumber: { type: Number, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        orderId: { type: String, required: true, unique: true },
        paymentMethod: { type: String, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date }
    },
    {
        timestamps: true
    }
)
OrderSchema.plugin(mongoosePageinate)

const Order = mongoose.model('Order', OrderSchema)
export default Order

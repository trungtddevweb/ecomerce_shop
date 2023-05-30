import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    sumPrice: { type: Number, required: true }
})

const OrderSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        orderCode: { type: String, required: true, unique: true },
        orderedDate: { type: Date, default: Date.now },
        products: { type: [productSchema], required: true },
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String },
        location: {
            selectedProvinces: { type: String },
            selectedDistrict: { type: String },
            selectedWard: { type: String }
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: String, required: true }
        },
        discount: {
            type: Number,
            default: 0
        },
        voucherCode: {
            type: String
        },
        status: {
            type: String,
            enum: ['prepare', 'pending', 'delivering', 'delivered', 'cancel'],
            default: 'prepare'
        },
        isPaid: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)
OrderSchema.plugin(mongoosePageinate)

const Order = mongoose.model('Order', OrderSchema)
export default Order

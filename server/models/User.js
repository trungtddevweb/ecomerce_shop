import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const Voucher = new Schema({
    voucherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher'
    }
})

const ProductItem = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        sumPrice: {
            type: Number
        }
    },
    { timestamps: true }
)

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            default: ''
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        voucher: [Voucher],
        ordersCount: {
            type: [String]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        totalCancel: {
            type: Number,
            default: 0
        },
        products: [ProductItem],
        totalItems: { type: Number, default: 0 },
        tokens: [{ type: Object }]
    },
    { timestamps: true }
)
UserSchema.plugin(mongoosePageinate)

const User = mongoose.model('User', UserSchema)
export default User

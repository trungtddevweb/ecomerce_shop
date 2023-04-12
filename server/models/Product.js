import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
        colors: {
            type: [String],
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        productImages: {
            type: [String],
            default: ''
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            default: 'tất cả'
        },
        sizes: {
            type: [String],
            enum: ['s', 'm', 'l', 'xl', 'xxl', '3xl', '4xl'],
            default: 'l'
        },
        isHot: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

ProductSchema.plugin(mongoosePageinate)

const Product = mongoose.model('Product', ProductSchema)
export default Product

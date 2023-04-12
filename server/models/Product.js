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
            type: String
        },
        color: {
            type: [String],
            default: 'trắng'
        },
        brand: {
            type: String,
            unique: true,
            required: true
        },
        productImg: {
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
            enum: [
                'nam',
                'nữ',
                'trẻ con',
                'học sinh',
                'vòng cổ',
                'áo sơ mi',
                'áo thun',
                'tất cả',
                'váy',
                'đầm',
                'hoodie',
                'mũ',
                'quần short',
                'giày cao gót'
            ],
            default: 'all'
        },
        size: {
            type: String,
            enum: ['s', 'm', 'l', 'xl', 'xxl', '3xl', '4xl'],
            default: 'l'
        },
        isHot: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

ProductSchema.plugin(mongoosePageinate)

const Product = mongoose.model('Product', ProductSchema)
export default Product

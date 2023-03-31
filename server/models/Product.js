import mongoose from "mongoose";
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
    },
    productImg: {
        type: String,
        default: '',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        enum: ['male', 'femfale', 'children', 'student', 'jewellery', 'shirt', 'sandal', 'all'],
        default: 'all'
    }

}, { timestamps: true })



ProductSchema.plugin(mongoosePageinate)

const Product = mongoose.model('Product', ProductSchema);
export default Product;
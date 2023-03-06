import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
    userId: {
        type: String,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
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
    }

}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
export default Product;
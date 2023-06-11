import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        picture: {
            type: [String],
            default: ''
        },
        author: {
            type: String,
            default: 'Ẩn danh'
        }
    },
    { timestamps: true }
)

BlogSchema.plugin(mongoosePageinate)

const Blog = mongoose.model('Blog', BlogSchema)
export default Blog

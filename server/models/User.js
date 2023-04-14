import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

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
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        totalItems: {
            type: Number,
            default: 0
        },
        tokens: [{ type: Object }]
    },
    { timestamps: true }
)

UserSchema.plugin(mongoosePageinate)

const User = mongoose.model('User', UserSchema)
export default User

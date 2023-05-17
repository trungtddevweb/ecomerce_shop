import mongoose from 'mongoose'
import mongoosePageinate from 'mongoose-paginate-v2'

const { Schema } = mongoose

const VoucherSchema = new Schema(
    {
        voucherCode: {
            type: String,
            minlength: 10,
            maxlength: 20,
            required: true,
            unique: true
        },
        discount: {
            type: Number,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        used: {
            type: Number,
            default: 0
        },
        expired: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

VoucherSchema.plugin(mongoosePageinate)

const Voucher = mongoose.model('Voucher', VoucherSchema)
export default Voucher

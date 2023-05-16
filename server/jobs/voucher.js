import cron from 'node-cron'
import Voucher from '../models/Voucher.js'

// Tác vụ kiểm tra và cập nhật trạng thái voucher hết hạn
const voucherJob = cron.schedule('* * * * *', async () => {
    try {
        // Lấy tất cả các voucher chưa hết hạn
        const vouchers = await Voucher.find({ expirationDate: { $gte: new Date() } })

        // Lặp qua từng voucher
        vouchers.forEach(async voucher => {
            if (voucher.expirationDate < new Date()) {
                // Cập nhật trạng thái voucher thành "hết hạn"
                await Voucher.findByIdAndUpdate(voucher._id, { expired: true })
            }
        })
    } catch (error) {
        console.error('Lỗi kiểm tra và cập nhật voucher:', error)
    }
})

export default voucherJob

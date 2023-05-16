import cron from 'node-cron'
import Voucher from '../models/Voucher.js'

// Tác vụ kiểm tra và cập nhật trạng thái voucher hết hạn
const voucherJob = cron.schedule('* * * * *', async () => {
    try {
        // Lấy tất cả các voucher chưa hết hạn
        const localTime = new Date()
        const currentUTCTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000)
        const vouchers = await Voucher.find({ endTime: { $gte: currentUTCTime } })

        // Lặp qua từng voucher
        vouchers.forEach(async voucher => {
            if (voucher.endTime < currentUTCTime) {
                // Cập nhật trạng thái voucher thành "hết hạn"
                await Voucher.findByIdAndUpdate(voucher._id, { expired: true })
            }
        })
    } catch (error) {
        console.error('Lỗi kiểm tra và cập nhật voucher:', error)
    }
})

export default voucherJob

import cron from 'node-cron'
import Voucher from '../models/Voucher.js'

// Tác vụ kiểm tra và cập nhật trạng thái voucher hết hạn
const voucherJob = cron.schedule('* * * * *', async () => {
    try {
        // Lấy tất cả các voucher chưa hết hạn
        const localTime = new Date()
        const currentUTCTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000)
        const vouchers = await Voucher.find({ endTime: { $lt: currentUTCTime } })

        // Lặp qua từng voucher
        // Cập nhật giá của các sản phẩm về giá chính
        for (const voucher of vouchers) {
            voucher.expired = true
            await voucher.save()
        }
    } catch (error) {
        console.error('Lỗi kiểm tra và cập nhật voucher:', error)
    }
})

export default voucherJob

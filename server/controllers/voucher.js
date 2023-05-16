import Voucher from '../models/Voucher.js'

export const createVoucher = async (req, res) => {
    try {
        const { voucherCode, total, startTime, endTime, discount } = req.body
        const existVoucher = await Voucher.findOne({ voucherCode })
        if (existVoucher) return res.status(400).json('Voucher đã tồn tại')

        if (endTime <= startTime) {
            return res.status(400).json('Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
        }

        const newVoucher = await Voucher({
            voucherCode,
            total,
            startTime,
            endTime,
            discount
        })
        await newVoucher.save()
        res.status(201).json(newVoucher)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const getAllVoucher = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const vouchers = await Voucher.paginate({}, options)
        res.status(200).json(vouchers)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const getAVoucher = async (req, res) => {
    const { voucherCode } = req.body
    try {
        const voucher = await Voucher.findOne({ voucherCode })
        if (!voucher) return res.status(404).json('Không tìm thấy voucher!')
        if (voucher.expired) {
            return res.status(400).json('Voucher đã hết hạn!')
        }
        res.status(200).json(voucher)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const updatedVoucher = async (req, res) => {
    const voucherId = req.body.id
    const updatedFields = req.body

    try {
        const voucherToUpdate = await Voucher.findById(voucherId)
        if (!voucherToUpdate) {
            return res.status(404).json({
                error: `Không tìm thấy voucher có ID là ${voucherId}`
            })
        }

        const fieldsToUpdate = Object.keys(updatedFields)
        const updateObject = Object.assign({}, ...fieldsToUpdate.map(field => ({ [field]: updatedFields[field] })))

        const updatedVoucher = await Voucher.findByIdAndUpdate(voucherId, updateObject, { new: true })

        return res.status(200).json(updatedVoucher)
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

export const deletedVoucher = async (req, res) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ status: false, message: 'SelectedIds is not specified' })
        const checkIds = await Voucher.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return res.status(404).json({ message: 'Không tìm thấy Voucher' })

        await Voucher.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'Danh sách voucher đã bị xóa!' })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

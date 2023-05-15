import express from 'express'
import { createVoucher, deletedVoucher, getAVoucher, getAllVoucher, updatedVoucher } from '../controllers/voucher.js'

const router = express.Router()

// Create a voucher
router.post('/', createVoucher)

// Get a voucher
router.post('/find', getAVoucher)

// Get all voucher
router.get('/all-vouchers', getAllVoucher)

// Update voucher
router.patch('/', updatedVoucher)

// Delete voucher
router.delete('/', deletedVoucher)

export default router

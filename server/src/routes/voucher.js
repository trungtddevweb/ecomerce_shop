import express from 'express'
import { createVoucher, deletedVoucher, getAVoucher, getAllVoucher, updatedVoucher } from '../controllers/voucher.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

// Create a voucher
router.post('/', verifyAdmin, createVoucher)

// Get a voucher
router.post('/find', getAVoucher)

// Get all voucher
router.get('/all-vouchers', getAllVoucher)

// Update voucher
router.patch('/', verifyAdmin, updatedVoucher)

// Delete voucher
router.delete('/', verifyAdmin, deletedVoucher)

export default router

import express from 'express'
import {
    createOrder,
    deletedOrderById,
    getAllOrderByAdmin,
    getOrderByFields,
    getOrderByOrderCode,
    getOrderByUserId,
    updateOrder
} from '../controllers/order.js'
import { verifyAdmin, verifyUser } from '../middleware/verify.js'

const router = express.Router()

// Create a order
router.post('/', verifyUser, createOrder)

// Get order by orderCode
router.get('/order-code', getOrderByOrderCode)

// Get all order
router.get('/all-order', verifyAdmin, getAllOrderByAdmin)

// Get orders by userId
router.get('/', verifyUser, getOrderByUserId)

// Get Order by fields
router.get('/search', verifyAdmin, getOrderByFields)

// Update order
router.patch('/', verifyUser, updateOrder)

// Delete order
router.delete('/', verifyAdmin, deletedOrderById)

export default router

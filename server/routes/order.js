import express from 'express'
import {
    cancelOrderByAdmin,
    cancelOrderByUser,
    createOrder,
    deletedOrderById,
    getAllOrderByAdmin,
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

// Update order
router.patch('/', verifyAdmin, updateOrder)

// Delete order
router.delete('/', verifyAdmin, deletedOrderById)

// Cancel order by User
router.post('/user-cancel', verifyUser, cancelOrderByUser)

// Cancel order by Admin
router.post('/admin-cancel', verifyAdmin, cancelOrderByAdmin)

export default router

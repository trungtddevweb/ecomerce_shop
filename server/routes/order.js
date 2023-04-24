import express from 'express'
import { createOrder } from '../controllers/order.js'
import { verifyUser } from '../middleware/verify.js'

const router = express.Router()

// Create a order
router.post('/', verifyUser, createOrder)

export default router

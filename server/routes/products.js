import express from 'express'
import { register, login, logout } from '../controllers/auth.js'

const router = express.Router()

// CREATE A PRODUCT
// router.post('/register', register)
// GET A PRODUCT
// router.post('/products/:productId', login)
// GET ALL PRODUCTS
// router.post('/products', logout)

export default router
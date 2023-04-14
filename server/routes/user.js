import express from 'express'
import {
    addProductToUser,
    deleteUsers,
    getAllUsers,
    removeAllProducts,
    removeProductFromCart
} from '../controllers/user.js'
import { verifyAdmin, verifyUser } from '../middleware/verify.js'

const router = express.Router()

// Get All Users
router.get('/', verifyAdmin, getAllUsers)

// Delete Many Users
router.delete('/', verifyAdmin, deleteUsers)

// Add productId to products field
router.patch('/add', verifyUser, addProductToUser)

// Remove productId to products field
router.patch('/remove', verifyUser, removeProductFromCart)

// Remove all products from the cart
router.patch('/remove-all', verifyUser, removeAllProducts)

export default router

import express from 'express'
import {
    addProductToUser,
    deleteUsers,
    getAllUsers,
    removeAllProducts,
    removeMutiplesProductId,
    removeProductIdFromCart,
    removeQuantityProductIdFromCart
} from '../controllers/user.js'
import { verifyAdmin, verifyUser } from '../middleware/verify.js'

const router = express.Router()

// Get All Users
router.get('/', verifyAdmin, getAllUsers)

// Delete Many Users
router.delete('/', verifyAdmin, deleteUsers)

// Add productId to products field
router.post('/add', verifyUser, addProductToUser)

// Remove quantity of productId to products field
router.delete('/remove-quantity', verifyUser, removeQuantityProductIdFromCart)

// Remove productId from products field
router.delete('/remove', verifyUser, removeProductIdFromCart)

// Remove mutiple productId from products
router.patch('/remove-mutiple', verifyUser, removeMutiplesProductId)

// Remove all products from the cart
router.patch('/remove-all', verifyUser, removeAllProducts)

export default router

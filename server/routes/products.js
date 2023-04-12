import express from 'express'
import { getAProduct, createAProduct, getAllProduct, deletedProduct, updatedProduct } from '../controllers/product.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', verifyAdmin, uploadCloud.array('picture'), createAProduct)

// GET ALL PRODUCTS
router.get('/', getAllProduct)

// GET A PRODUCT
router.get('/:productId', getAProduct)

// DELETED MANY PRODUCTS
router.delete('/', verifyAdmin, deletedProduct)

// UPDATED A PRODUCT
router.put('/', verifyAdmin, updatedProduct)

export default router

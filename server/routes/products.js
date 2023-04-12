import express from 'express'
import { getAProduct, createAProduct, getAllProduct, deletedProduct } from '../controllers/product.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', verifyAdmin, uploadCloud.array('picture'), createAProduct)

// GET ALL PRODUCTS
router.get('/', getAllProduct)

// GET A PRODUCT
router.get('/:productId', getAProduct)

// DELETE MANY PRODUCTS
router.delete('/', verifyAdmin, deletedProduct)

export default router

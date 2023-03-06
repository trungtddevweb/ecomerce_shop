import express from 'express'
import { getAProduct, createAProduct, getAllProductByUser } from '../controllers/product.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', verifyAdmin, createAProduct)


// GET ALL PRODUCTS
router.get('/')

// GET A PRODUCT
router.get('/:productId', getAProduct)

export default router
import express from 'express'
import { getAProduct, getAllProduct, createAProduct } from '../controllers/product.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', createAProduct)
// GET A PRODUCT
router.get('/:productId', getAProduct)
// GET ALL PRODUCTS
router.get('/', getAllProduct)

export default router
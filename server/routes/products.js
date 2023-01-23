import express from 'express'
import { getAProduct, createAProduct, getAllProductByUser } from '../controllers/product.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', createAProduct)
// GET A PRODUCT
router.get('/:productId', getAProduct)
// GET ALL PRODUCTS
router.get('/:userId/:productId', getAllProductByUser)

export default router
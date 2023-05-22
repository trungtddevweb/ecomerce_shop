import express from 'express'
import {
    getAProduct,
    createAProduct,
    getAllProduct,
    deletedProduct,
    updatedProduct,
    searchByName,
    searchByField,
    getProductsByHot,
    getRandomProducts,
    flashSaleProduct,
    getALlProductsInflashSale,
    deleteFlashSaleProduct,
    updateFlashSaleTime
} from '../controllers/product.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'
import { validateFlashSaleProduct } from '../middleware/joiMiddleWare.js'

const router = express.Router()

// CREATE A PRODUCT
router.post('/', verifyAdmin, uploadCloud.array('picture'), createAProduct)

// GET ALL PRODUCTS
router.get('/', getAllProduct)

// GET A PRODUCT
router.get('/find/:productId', getAProduct)

// GET RANDOM PRODUCT
router.get('/random', getRandomProducts)

// DELETED MANY PRODUCTS
router.delete('/', verifyAdmin, deletedProduct)

// UPDATED A PRODUCT
router.put('/', verifyAdmin, updatedProduct)

// QUERY BY NAME
router.get('/search', searchByName)

// QUERY BY FILEDNAME
router.get('/fields/search', searchByField)

//QUERY BY isHOT PRODUCT
router.get('/search/hots', getProductsByHot)

// CREATE PRODUCT IN FLASH SALE
router.post('/flash-sale/create', verifyAdmin, validateFlashSaleProduct, flashSaleProduct)

// GET ALL PRODUCT IN FLASH SALE
router.get('/flash-sale/products', getALlProductsInflashSale)

// UPDATE PRODUCT IN FLASH SALE
router.put('/flash-sale/products', verifyAdmin, updateFlashSaleTime)

// DELETE PRODUCT IN FLASH SALE
router.delete('/flash-sale/products', verifyAdmin, deleteFlashSaleProduct)

export default router

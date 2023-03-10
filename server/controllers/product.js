import responseHandler from "../handler/responseHandler.js"
import Product from "../models/Product.js";

export const createAProduct = async (req, res, next) => {
    try {
        const newProduct = await Product({
            ...req.body
        })
        await newProduct.save()
        responseHandler.created(res, newProduct)
    } catch (error) {
        next(responseHandler.error(error))
    }
}

export const getAProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        next(responseHandler.error(error));
    }
}

export const getAllProduct = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10
        const page = parseInt(req.query.page, 10) || 1
        const products = await Product.paginate({}, { limit, page })
        responseHandler.getData(res, products)
    } catch (error) {
        next(responseHandler.error(error));
    }
}
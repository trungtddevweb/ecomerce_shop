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

export const getAllProductByUser = async (req, res, next) => {
    try {

    } catch (error) {
        next(responseHandler.error(error));
    }
}
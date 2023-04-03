import responseHandler from "../handler/responseHandler.js"
import Product from "../models/Product.js";

export const createAProduct = async (req, res, next) => {
    const picture = req.file
    try {
        const newProduct = await Product({
            ...req.body,
            productImg: picture?.path
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
        next(responseHandler.error(error))
    }
}

export const deletedProduct = async (req, res, next) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ status: false, message: 'SelectedIds is not specified' })
        const checkIds = await Product.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter((id) => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return next(responseHandler.notFound(res))

        await Product.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: "List products has been deleted!" })
    } catch (error) {
        console.error(error)
        next(responseHandler.error(error))
    }
}
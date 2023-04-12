import responseHandler from '../handler/responseHandler.js'
import Product from '../models/Product.js'

export const createAProduct = async (req, res) => {
    const filepaths = req.files?.map(file => file.path)
    try {
        const newProduct = await Product({
            ...req.body,
            productImages: filepaths
        })
        await newProduct.save()
        responseHandler.created(res, newProduct)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10
        const page = parseInt(req.query.page, 10) || 1
        const products = await Product.paginate({}, { limit, page })
        responseHandler.getData(res, products)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const deletedProduct = async (req, res) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ status: false, message: 'SelectedIds is not specified' })
        const checkIds = await Product.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) returnresponseHandler.notFound(res)

        await Product.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'List products has been deleted!' })
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const updatedProduct = async (req, res) => {
    try {
        const updateFields = req.body
        const { productId } = req.body
        if (!productId) return responseHandler.notFound(res)
        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateFields }, { new: true })
        responseHandler.success(res, updatedProduct)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

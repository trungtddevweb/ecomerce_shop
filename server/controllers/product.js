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
        res.status(500).json({ message: error })
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
    const { page, limit } = req.query
    const fields = req.query.fields
    const selectedFields = fields ? fields.split(' ') : null
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' },
        select: selectedFields
    }
    try {
        const products = await Product.paginate({}, options)
        console.log('Select', fields)
        responseHandler.getData(res, products)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getProductsByHot = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit,
        page,
        // limit: parseInt(limit, 10) || 10,
        // page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const products = await Product.paginate({ isHot: true }, options)
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
        if (nonExistingIds.length > 0) return responseHandler.notFound(res)

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

// Query
export const searchByName = async (req, res) => {
    const queryValue = decodeURIComponent(req.query.q)
    const { limit, page } = req.query
    const query = { name: { $regex: new RegExp(queryValue, 'i') } }
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const products = await Product.paginate(query, options)
        responseHandler.success(res, products)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const searchByField = async (req, res) => {
    const { page, limit } = req.query
    const queryField = Object.keys(req.query)[0]
    const queryValue = req.query[queryField]
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const query = { [queryField]: { $regex: new RegExp(queryValue, 'i') } }
        const collection = await Product.paginate(query, options)
        responseHandler.success(res, collection)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

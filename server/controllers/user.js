import User from '../models/User.js'
import responseHandler from '../handler/responseHandler.js'

export const getAllUsers = async (req, res, next) => {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1
    const options = {
        select: 'name email createdAt',
        limit,
        page
    }
    try {
        const users = await User.paginate({ isAdmin: false }, options)
        responseHandler.getData(res, users)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ success: false, message: 'SelectedIds is not specified!' })
        const checkIds = await User.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return next(responseHandler.notFound(res))

        await User.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'List users has been deleted!' })
    } catch (error) {
        responseHandler.error(error)
    }
}

export const addProductToUser = async (req, res) => {
    const { productId } = req.body
    const userId = req.user._id
    try {
        const updateValues = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { products: productId }, $inc: { totalItems: 1 } },
            { new: true }
        ).populate('products')
        responseHandler.success(res, updateValues)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const removeProductFromCart = async (req, res) => {
    const { productId } = req.body
    const userId = req.user._id
    try {
        const updateValues = await User.findByIdAndUpdate(
            userId,
            { $pull: { products: productId }, $inc: { totalItems: -1 } },
            { new: true }
        ).populate('products')
        responseHandler.success(res, updateValues)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const removeAllProducts = async (req, res) => {
    const userId = req.user._id
    try {
        const updateValues = await User.findByIdAndUpdate(
            userId,
            { $set: { products: [] }, $inc: { totalItems: 0 } },
            { new: true }
        )
        responseHandler.success(res, updateValues)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

import User from '../models/User.js'
import responseHandler from "../handler/responseHandler.js"

export const getAllUsers = async (req, res, next) => {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1
    const options = {
        select: 'name email',
        limit,
        page
    }
    try {
        const users = await User.paginate({ isAdmin: false }, options)
        responseHandler.getData(res, users)
    } catch (error) {
        next(responseHandler.error(res, error))
        // console.error(error)
    }
}
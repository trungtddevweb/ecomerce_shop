import Blog from '../models/Blog.js'
import responseHandler from "../handler/responseHandler.js"

export const createAPost = async (req, res, next) => {
    const picture = req.file
    try {
        const post = await Blog({
            ...req.body,
            picture: picture?.path

        })
        await post.save()
        responseHandler.created(res, post)
    } catch (error) {
        next(responseHandler.error(res, error))
    }
}

export const getAPost = async (req, res, next) => {
    try {
        const post = await Blog.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        next(responseHandler.error(res, error))
    }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 4
        const page = parseInt(req.query.page, 10) || 1
        const posts = await Blog.paginate({}, { limit, page })
        responseHandler.getData(res, posts)
    } catch (error) {
        next(responseHandler.error(res, error))
    }
}
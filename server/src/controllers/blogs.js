import Blog from '../models/Blog.js'
import responseHandler from '../handler/responseHandler.js'
import mongoose from 'mongoose'

export const createAPost = async (req, res) => {
    const filepaths = req.files?.map(file => file.path)
    try {
        const post = await Blog({
            ...req.body,
            picture: filepaths
        })
        await post.save()
        responseHandler.created(res, post)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const getAPost = async (req, res) => {
    const blogId = req.params.blogId
    try {
        const post = await Blog.findById({ _id: blogId })
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getAllPosts = async (req, res) => {
    const { limit, page } = req.query
    const options = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { createdAt: 'desc' }
    }
    try {
        const posts = await Blog.paginate({}, options)
        responseHandler.getData(res, posts)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const updatedPost = async (req, res) => {
    const { postId } = req.body
    const updateFields = req.body
    try {
        if (!postId) return responseHandler.notFound(res)
        const updatedPost = await Blog.findByIdAndUpdate(postId, { $set: updateFields }, { new: true })
        responseHandler.success(res, updatedPost)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

export const deletedPosts = async (req, res) => {
    try {
        const { selectedIds } = req.body
        if (!selectedIds) return res.status(400).json({ success: false, message: 'SelectedIds is not specified!' })
        const checkIds = await Blog.find({
            _id: {
                $in: selectedIds
            }
        }).exec()
        const existingIds = checkIds.map(id => id.id)
        const nonExistingIds = selectedIds.filter(id => !existingIds.includes(id))
        if (nonExistingIds.length > 0) return responseHandler.notFound(res)

        await Blog.deleteMany({ _id: { $in: selectedIds } })
        res.status(200).json({ success: true, message: 'List blogs has been deleted!' })
    } catch (error) {
        console.error(error)
        responseHandler.error(error)
    }
}

// QUERY
export const searchByTitle = async (req, res) => {
    const { limit, page } = req.query
    const titleValues = req.query.title
    const options = {
        limit: parseInt(limit, 10) || 4,
        page: parseInt(page, 10) || 1
    }
    try {
        const query = { title: { $regex: new RegExp(titleValues, 'i') } }
        const collections = await Blog.paginate(query, options)
        responseHandler.success(res, collections)
    } catch (error) {
        responseHandler.error(res, error)
    }
}

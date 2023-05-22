import express from 'express'
import { createAPost, deletedPosts, getAPost, getAllPosts, searchByTitle } from '../controllers/blogs.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'

const router = express.Router()

// Create A Post
router.post('/', verifyAdmin, uploadCloud.single('picture'), createAPost)

// Get A Post
router.get('/find/:blogId', getAPost)

// Get All Posts
router.get('/', getAllPosts)

// Delete Many Posts
router.delete('/', verifyAdmin, deletedPosts)

// SEARCH BLOG
router.get('/search', searchByTitle)

export default router

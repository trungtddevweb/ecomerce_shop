import express from 'express'
import { createAPost, deletedPosts, getAPost, getAllPosts, searchByTitle, updatedPost } from '../controllers/blogs.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'

const router = express.Router()

// Create A Post
router.post('/', verifyAdmin, uploadCloud.array('picture'), createAPost)

// Get A Post
router.get('/find/:blogId', getAPost)

// Get All Posts
router.get('/', getAllPosts)

// Update a Post
router.put('/', verifyAdmin, updatedPost)

// Delete Many Posts
router.delete('/', verifyAdmin, deletedPosts)

// SEARCH BLOG
router.get('/search', searchByTitle)

export default router

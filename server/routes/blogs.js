import express from 'express'
import { createAPost, getAPost, getAllPosts } from '../controllers/blogs.js'
import { verifyAdmin } from '../middleware/verify.js'
import uploadCloud from '../middleware/cloudinary.js'


const router = express.Router()

// Create A Post 
router.post('/', verifyAdmin, uploadCloud.single('picture'), createAPost)
// Get A Post
router.get('/:blogId', getAPost)
// Get All Posts
router.get('/', getAllPosts)

export default router
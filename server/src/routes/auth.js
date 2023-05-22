import express from 'express'
import { register, login, logout } from '../controllers/auth.js'
import uploadCloud from '../middleware/cloudinary.js'
import { verifyUser } from '../middleware/verify.js'

const router = express.Router()

// REGISTER
router.post('/register', uploadCloud.single('picture'), register)

// LOGIN
router.post('/login', login)

// LOGOUT
router.post('/logout', verifyUser, logout)

export default router

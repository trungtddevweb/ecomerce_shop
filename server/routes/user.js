import express from 'express'
import { getAllUsers } from '../controllers/user.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

// Get All Users
router.get('/', verifyAdmin, getAllUsers)

export default router
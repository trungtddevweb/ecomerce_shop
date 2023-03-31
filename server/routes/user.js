import express from 'express'
import { deleteUsers, getAllUsers } from '../controllers/user.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

// Get All Users
router.get('/', verifyAdmin, getAllUsers)

// Delete Many Users
router.delete('/', verifyAdmin, deleteUsers)

export default router
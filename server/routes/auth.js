import express from "express";
import { register, login, logout } from "../controllers/auth.js";
import uploadCloud from '../middleware/cloudinary.js'

const router = express.Router();

// REGISTER
router.post("/register", uploadCloud.single('picture'), register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.post("/logout", logout);

export default router;

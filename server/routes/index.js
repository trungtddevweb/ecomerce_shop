import express from 'express';
import authRoutes from './auth.js'
import productsRoutes from './products.js'


const router = express.Router();

router.use('/auth', authRoutes);

router.use('/products', productsRoutes);


export default router;
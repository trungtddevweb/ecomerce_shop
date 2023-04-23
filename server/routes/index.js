import express from 'express'
import authRoutes from './auth.js'
import productsRoutes from './products.js'
import blogRoutes from './blogs.js'
import userRoutes from './user.js'
import stripeRoutes from './stripe.js'

const router = express.Router()

router.use('/auth', authRoutes)

router.use('/products', productsRoutes)

router.use('/blogs', blogRoutes)

router.use('/users', userRoutes)

router.use('/stripe', stripeRoutes)

export default router

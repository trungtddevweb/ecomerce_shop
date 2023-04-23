import express from 'express'
import { checkoutSessionStripe } from '../controllers/stripe.js'

const router = express.Router()

router.post('/create-checkout-session', checkoutSessionStripe)

export default router

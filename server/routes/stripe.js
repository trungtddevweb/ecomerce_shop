import express from 'express'
import { checkoutSessionStripe, getKey } from '../controllers/stripe.js'

const router = express.Router()

router.post('/create-checkout-session', checkoutSessionStripe)

router.get('/config', getKey)

export default router

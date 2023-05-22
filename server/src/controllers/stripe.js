import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const checkoutSessionStripe = async (req, res) => {
    try {
        const products = req.body.products
        const totalAmount = products.reduce((total, productId) => {
            return total + productId.sumPrice
        }, 0)
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'EUR',
            amount: totalAmount,
            automatic_payment_methods: { enabled: true }
        })
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message
            }
        })
    }
}

export const getKey = (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLIC_KEY
    })
}

import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const checkoutSessionStripe = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt'
                    },
                    unit_amount: 2000
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`
    })

    res.status(303).json({ url: session.url })
}

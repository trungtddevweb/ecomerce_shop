import { PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function CheckoutForm({ onNext }) {
    const stripe = useStripe()
    const elements = useElements()

    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            setIsProcessing(true)
            if (!stripe || !elements) {
                return
            }
            const { paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${window.location.origin}/checkout-success`
                },
                redirect: 'if_required'
            })
            if (paymentIntent.status === 'succeeded') {
                onNext('Credit')
            }
            setIsProcessing(false)
        } catch (error) {
            setIsProcessing(false)
        }
    }

    return (
        <Box component='form' id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement id='payment-element' />
            <LoadingButton
                sx={{
                    marginTop: '20px'
                }}
                disabled={isProcessing || !stripe || !elements}
                loading={isProcessing}
                variant='contained'
                type='submit'
            >
                Thanh toán
            </LoadingButton>
        </Box>
    )
}

import { useState, useCallback } from 'react'
import { Box, Stepper, Step, StepLabel, Paper } from '@mui/material'
import { stepsCart } from 'src/utils/const'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import CartItems from './CartItems'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import useStyles from '~/assets/styles/useStyles'

const CartPage = () => {
    useDocumentTitle('Giỏ hàng')
    const classes = useStyles()
    const [order, setOrder] = useState({
        products: [],
        address: {},
        paymentMethod: {}
    })
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = useCallback(() => {
        setActiveStep(activeStep + 1)
    }, [activeStep])

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    const handleProductSelect = useCallback(
        selectedProducts => {
            setOrder(prevOrder => ({
                ...prevOrder,
                products: selectedProducts
            }))
            handleNext()
        },
        [handleNext]
    )

    const handleAddressSelect = useCallback(
        selectedAddress => {
            setOrder(prevOrder => ({
                ...prevOrder,
                address: selectedAddress
            }))
            handleNext()
        },
        [handleNext]
    )

    const handlePaymentMethodSelect = useCallback(
        selectedPaymentMethod => {
            setOrder(prevOrder => ({
                ...prevOrder,
                paymentMethod: selectedPaymentMethod
            }))
            handleNext()
        },
        [handleNext]
    )

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CartItems onNext={handleProductSelect} />
            case 1:
                return <AddressForm onNext={handleAddressSelect} onBack={handleBack} />
            case 2:
                return <PaymentForm onNext={handlePaymentMethodSelect} onBack={handleBack} />
            case 3:
                return <Review onBack={handleBack} order={order} />
            default:
                throw new Error('Unknown step')
        }
    }

    return (
        <Box className={classes.flexBox} bgcolor='lightGray' paddingY={6}>
            <Box width={1400}>
                <Paper
                    elevation={6}
                    sx={{
                        padding: '12px'
                    }}
                >
                    <Stepper activeStep={activeStep}>
                        {stepsCart.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
                <Box className={classes.flexBox}>{getStepContent(activeStep)}</Box>
            </Box>
        </Box>
    )
}

export default CartPage

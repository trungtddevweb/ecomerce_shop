import { useState, useCallback } from 'react'
import { Box, Stepper, Step, StepLabel, Paper, Typography, Card, Button, useTheme, useMediaQuery } from '@mui/material'
import Image from 'mui-image'
import { stepsCart } from 'src/utils/const'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import CartItems from './CartItems'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import useStyles from '~/assets/styles/useStyles'
import shippingImage from '~/assets/imgs/shipping.jpg'
import { KeyboardReturn } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useScrollToTop from '~/hooks/useScrollToTop'
import usePrevious from '~/hooks/usePrevious'

const CartPage = () => {
    useDocumentTitle('Giỏ hàng')
    useScrollToTop()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const isMatchLg = useMediaQuery(theme.breakpoints.down('lg'))
    const classes = useStyles()
    const [orderCode, setOrderCode] = useState('')
    const [voucherCode, setVoucherCode] = useState('')
    const [voucher, setVoucher] = useState(0)
    const [order, setOrder] = useState({
        products: [],
        address: {},
        paymentMethod: {}
    })
    const [activeStep, setActiveStep] = useState(0)
    // console.log('voucher====🚀', voucherCode)

    const previousAddress = usePrevious(order.address)
    const previousPaymentMethod = usePrevious(order.paymentMethod)
    const handleNext = useCallback(() => {
        setActiveStep(activeStep + 1)
        window.scrollTo(0, 0)
    }, [activeStep])

    const handleBack = useCallback(() => {
        setOrder({
            products: order.products,
            address: previousAddress,
            paymentMethod: previousPaymentMethod
        })
        setActiveStep(activeStep - 1)
    }, [activeStep, order.products, previousAddress, previousPaymentMethod])

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
                return (
                    <CartItems
                        isMatch={isMatch}
                        setVoucher={setVoucher}
                        onNext={handleProductSelect}
                        setVoucherCode={setVoucherCode}
                        voucherCode={voucherCode}
                    />
                )
            case 1:
                return <AddressForm isMatch={isMatch} onNext={handleAddressSelect} onBack={handleBack} />
            case 2:
                return (
                    <PaymentForm
                        isMatch={isMatch}
                        onNext={handlePaymentMethodSelect}
                        order={order}
                        onBack={handleBack}
                    />
                )
            case 3:
                return (
                    <Review
                        voucher={voucher}
                        isMatch={isMatch}
                        onBack={handleBack}
                        onNext={handleNext}
                        order={order}
                        voucherCode={voucherCode}
                        setOrderCode={setOrderCode}
                    />
                )
            default:
                throw new Error('Unknown step')
        }
    }

    return (
        <Box className={classes.flexBox} bgcolor='lightGray' paddingY={6} paddingX={1}>
            <Box>
                {!isMatch && (
                    <Paper
                        elevation={6}
                        sx={{
                            padding: '12px'
                        }}
                    >
                        <Stepper activeStep={activeStep} alternativeLabel={isMatchLg}>
                            {stepsCart.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                )}
                {activeStep === stepsCart.length ? (
                    <Box
                        className={classes.flexBox}
                        sx={{
                            minHeight: '60vh'
                        }}
                    >
                        <Card
                            sx={{
                                marginTop: '24px',
                                width: {
                                    md: '1000px'
                                },
                                padding: '20px'
                            }}
                        >
                            <Typography textAlign='center' color='primary' variant='h5' gutterBottom>
                                Cảm ơn bạn đã mua hàng ở cửa hàng chúng tôi
                            </Typography>
                            <Typography textAlign='center' component='div' variant='subtitle1'>
                                Mã đơn đặt hàng của bạn là
                                <Typography color='error' fontWeight={600}>
                                    {orderCode}
                                </Typography>{' '}
                                . Chúng tôi đã gửi email xác nhận đơn đặt hàng của bạn và sẽ gửi bạn một bản cập nhật
                                khi đơn đặt hàng của bạn đã được vận chuyển.Chúc bạn một ngày tốt lành và nhiều niềm
                                vui!
                            </Typography>
                            <Box className={classes.flexBox} gap={4} flexDirection='column'>
                                {' '}
                                <Image src={shippingImage} duration={0} alt='Shiping' width={200} />
                                <Button variant='contained' component={Link} to='/' startIcon={<KeyboardReturn />}>
                                    Trang chủ
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                ) : (
                    <Box p={isMatch ? 1 : 0} className={classes.flexBox}>
                        {getStepContent(activeStep)}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default CartPage

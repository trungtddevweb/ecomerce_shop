import { useState } from 'react'
import { Box, Stepper, Typography, Step, StepLabel, Button, Paper, Stack } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import { stepsCart } from 'src/utils/const'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { Home } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { lazy } from 'react'
// import CartItems from './CartItems'
const CartItems = lazy(() => import('./CartItems'))

const CartPage = () => {
    useDocumentTitle('Giỏ hàng')
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return (
        <Box className='cart-page'>
            <Box className='cart-wrapper'>
                <Paper
                    elevation={6}
                    sx={{
                        padding: '12px',
                        marginBottom: '20px'
                    }}
                >
                    <Stepper activeStep={activeStep}>
                        {stepsCart.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                </Paper>
                {activeStep === stepsCart.length ? (
                    <Box>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Đặt hàng thành công! Chờ đợi chúng tôi liên lạc lại với bạn để xác nhận đơn hàng
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button variant='contained' component={Link} to='/' startIcon={<Home />}>
                                Trang chủ
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Stack>
                        {activeStep === 0 ? (
                            <CartItems />
                        ) : activeStep === 1 ? (
                            <div>Component 2</div>
                        ) : (
                            <div>Component 3</div>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                variant='contained'
                                color='inherit'
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button variant='contained' onClick={handleNext}>
                                {activeStep === stepsCart.length - 1 ? 'Hoàn thành' : 'Bước tiếp theo'}
                            </Button>
                        </Box>
                    </Stack>
                )}
            </Box>
        </Box>
    )
}

export default CartPage

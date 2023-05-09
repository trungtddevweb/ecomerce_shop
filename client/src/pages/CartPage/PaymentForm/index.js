import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Card, Grid, Box, CardHeader, Divider, CardContent, Stack, Tab, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import CheckoutForm from '../CheckoutForm'
import { gePublicKey, getClientSecret } from '~/api/main'

const PaymentForm = ({ onNext, onBack, order, isMatch }) => {
    const [value, setValue] = useState('credit')
    const { products } = order
    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleNextStep = () => {
        onNext('cash')
    }

    useEffect(() => {
        const fetchPublicKey = async () => {
            const res = await gePublicKey()
            setStripePromise(loadStripe(res.publishableKey))
        }
        fetchPublicKey()
    }, [])

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getClientSecret(products)
            setClientSecret(res.clientSecret)
        }
        fetchProduct()
    }, [products])

    return (
        <Card
            sx={{
                marginTop: '24px',
                width: {
                    md: '1000px'
                }
            }}
        >
            <CardHeader title='Phương thức thanh toán' />
            <Divider component='div' variant='fullWidth' />
            <CardContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label='lab API tabs example'>
                                <Tab label='Bằng thẻ tín dụng' value='credit' />
                                <Tab label='Tiền mặt' value='cash' />
                            </TabList>
                        </Box>
                        <TabPanel value='credit'>
                            {clientSecret && stripePromise && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm onNext={onNext} />
                                </Elements>
                            )}
                        </TabPanel>
                        <TabPanel value='cash'>
                            <Typography
                                sx={{
                                    minHeight: '220px'
                                }}
                            >
                                Thanh toán bằng tiền mặt khi nhận hàng
                            </Typography>
                        </TabPanel>
                    </TabContext>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row'>
                            <Button onClick={onBack} variant={value === 'credit' ? 'contained' : 'text'}>
                                Trở lại
                            </Button>
                            <Button variant='contained' hidden={value === 'credit'} onClick={handleNextStep}>
                                Tiếp tục
                            </Button>
                        </Stack>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PaymentForm

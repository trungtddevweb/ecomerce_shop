import { Box,Button,ListItemText, Grid,Typography,List, ListItem ,  Card, CardContent, CardHeader, Divider, Stack } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { orderProductAPI } from '~/api/main'

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA']
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' }
]

export default function Review({ order, onBack }) {
    const { products, address, paymentMethod } = order
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)

    const totalPrice = useMemo(
        () => products.reduce((accumulator, currentValue) => accumulator + currentValue.sumPrice, 0),
        [products]
    )

    const handleOrder = async () => {
        try {
            const res = await orderProductAPI(token, order)
            if (res.statusCode === 200) {
                dispatch(showToast({ type: 'success', message: 'Đặt hàng thành công!' }))
            }
        } catch (error) {
            dispatch(showToast({ type: 'error', message: 'Có lỗi xảy ra !' }))
            console.error(error.message)
        }
    }

    return (
        <Card
            sx={{
                marginTop: '24px',
                width: '1000px'
            }}
        >
            <CardHeader title='Chi tiết hóa đơn' />
            <Divider component='div' variant='fullWidth' />
            <CardContent>
                <List disablePadding>
                    {products.map(product => (
                        <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                primary={<Typography fontWeight={600}>{product.productId.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography component='span' variant='body2'>
                                            Số lượng: {product.quantity}
                                        </Typography>
                                        {' | '}
                                        <Typography component='span' variant='body2'>
                                            Màu sắc: {product.color}
                                        </Typography>
                                        {' | '}
                                        <Typography component='span' variant='body2'>
                                            Kích thước: {product.size}
                                        </Typography>
                                    </>
                                }
                            />
                            <Typography fontWeight={600} variant='body2'>
                                {product.sumPrice?.toLocaleString('vi-VN')} VNĐ
                            </Typography>
                        </ListItem>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<Typography fontWeight={600}>Phí vận chuyển</Typography>} />
                        <Typography>{`0 VNĐ (Freeship)`}</Typography>
                    </ListItem>
                    <Divider variant='fullWidth' component='div' />

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<Typography fontWeight={600}>Tổng tiền</Typography>} />
                        <Typography variant='subtitle1' color='error' sx={{ fontWeight: 700 }}>
                            {totalPrice.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                            Thông tin khách hàng
                        </Typography>
                        <Typography gutterBottom>
                            {address.firstName} {address.lastName}
                        </Typography>
                        <Typography gutterBottom>{addresses.join(', ')}</Typography>
                    </Grid>
                    <Divider component='div' />
                    <Grid item container direction='column' xs={12} sm={6}>
                        <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                            Phương thức thanh toán
                        </Typography>
                        <Grid container>
                            {payments.map(payment => (
                                <Box key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row'>
                            <Button onClick={onBack} variant='text'>
                                Trở lại
                            </Button>
                            <Button variant='contained' onClick={handleOrder} type='submit'>
                                Xác nhận
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

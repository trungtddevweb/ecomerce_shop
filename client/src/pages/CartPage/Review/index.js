import {
    Box,
    Button,
    ListItemText,
    Grid,
    Typography,
    List,
    ListItem,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack
} from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { orderProductAPI } from '~/api/main'

export default function Review({ order, onBack, onNext }) {
    const { products, address, paymentMethod } = order
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)

    const totalPrice = useMemo(
        () => products.reduce((accumulator, currentValue) => accumulator + currentValue.sumPrice, 0),
        [products]
    )

    const handleOrder = async () => {
        // try {
        //     const res = await orderProductAPI(token, order)
        //     if (res.statusCode === 200) {
        //         dispatch(showToast({ type: 'success', message: 'Đặt hàng thành công!' }))
        //     }
        // } catch (error) {
        //     dispatch(showToast({ type: 'error', message: 'Có lỗi xảy ra !' }))
        //     console.error(error.message)
        // }
        onNext()
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
                        <Typography variant='h6' fontWeight={600} color='error' gutterBottom sx={{ mt: 2 }}>
                            Thông tin khách hàng
                        </Typography>
                        <Stack direction='row'>
                            <Typography gutterBottom>Họ và tên:</Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.fullName}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom>Số điện thoại: </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.phoneNumber}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom>Địa chỉ thường trú: </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.address1}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom>Địa chỉ nhận hàng: </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.address2}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item container direction='column' xs={12} sm={6}>
                        <Typography variant='h6' fontWeight={600} gutterBottom sx={{ mt: 2 }}>
                            Phương thức thanh toán
                        </Typography>
                        {paymentMethod === 'cash' ? (
                            <Typography>Thanh toán bằng tiền mặt khi nhận hàng</Typography>
                        ) : (
                            <Typography>Đã thanh toán thành công bằng thẻ tín dụng</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row' spacing={2}>
                            <Typography color='text.secondary'>Trạng thái đơn hàng</Typography>
                            {order.paymentMethod === 'cash' ? (
                                <Typography color='orange' fontWeight={600}>
                                    Đang chờ thanh toán
                                </Typography>
                            ) : (
                                <Typography color='green' fontWeight={600}>
                                    Đã thanh toán
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row'>
                            <Button onClick={onBack} hidden={order.paymentMethod !== 'cash'} variant='text'>
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

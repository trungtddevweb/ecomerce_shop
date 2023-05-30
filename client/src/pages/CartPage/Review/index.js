import {
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
import { formatPrice } from 'src/utils/format'
import { orderProductAPI } from '~/api/main'
import useStyles from '~/assets/styles/useStyles'

export default function Review({ order, onBack, onNext, setOrderCode, voucher, voucherCode, sumPrice }) {
    const { products, address, paymentMethod } = order
    const { location } = address
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user?.token)
    const isPaid = paymentMethod === 'credit'
    const classes = useStyles()

    const totalPrice = useMemo(
        () => products.reduce((accumulator, currentValue) => accumulator + currentValue.sumPrice, 0),
        [products]
    )

    const newProducts = products.map(product => ({
        productId: product.productId,
        name: product.productId.name,
        quantity: product.quantity,
        price: product.productId.price,
        color: product.color,
        size: product.size,
        sumPrice: product.sumPrice
    }))
    const shippingAddress = {
        fullName: address.fullName,
        address: address.address,
        phone: address.phoneNumber
    }

    const payload = {
        totalPrice,
        products: newProducts,
        paymentMethod,
        shippingAddress,
        isPaid,
        discount: voucher,
        voucherCode,
        location
    }

    const handleOrder = async () => {
        try {
            const res = await orderProductAPI(token, payload)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Đặt hàng thành công!' }))
                setOrderCode(res.data.orderCode)
                onNext()
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
                width: {
                    md: '96vw',
                    xl: 1000
                }
            }}
        >
            <CardHeader title='Chi tiết hóa đơn' />
            <Divider component='div' variant='fullWidth' />
            <CardContent>
                <List disablePadding>
                    {products.map(product => (
                        <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <ListItemText
                                        primary={
                                            <Typography className={classes.title}>{product.productId.name}</Typography>
                                        }
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
                                </Grid>
                                <Grid item xs={4} className='d-flex align-items-center justify-content-end'>
                                    <Typography fontWeight={600} color='error' variant='body2'>
                                        {product.sumPrice?.toLocaleString('vi-VN')} đ
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<Typography fontWeight={600}>Voucher</Typography>} />
                        <Typography variant='body2' fontWeight={600} color='error'>
                            {' '}
                            - {formatPrice(voucher)} đ
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<Typography fontWeight={600}>Phí vận chuyển</Typography>} />
                        <Typography>Miễn phí ship</Typography>
                    </ListItem>
                    <Divider variant='fullWidth' component='div' />

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={<Typography fontWeight={600}>Tổng tiền</Typography>} />
                        <Typography variant='subtitle1' color='error' sx={{ fontWeight: 700 }}>
                            {sumPrice.toLocaleString('vi-VN')} đ
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' fontWeight={600} color='error' gutterBottom sx={{ mt: 2 }}>
                            Thông tin khách hàng
                        </Typography>
                        <Stack direction='row'>
                            <Typography minWidth={150} gutterBottom>
                                Họ và tên:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.fullName}
                            </Typography>
                        </Stack>

                        <Stack direction='row'>
                            <Typography minWidth={150} gutterBottom>
                                Số điện thoại:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.phoneNumber}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom minWidth={150}>
                                Thành phố/Tỉnh:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {location.selectedProvinces}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom minWidth={150}>
                                Quận/Huyện:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {location.selectedDistrict}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom minWidth={150}>
                                Thị xã:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {location.selectedWard}
                            </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography gutterBottom minWidth={150}>
                                Địa chỉ cụ thể:
                            </Typography>
                            <Typography color='primary' fontWeight={600} gutterBottom>
                                {address.address}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item container direction='column' xs={12} md={6}>
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

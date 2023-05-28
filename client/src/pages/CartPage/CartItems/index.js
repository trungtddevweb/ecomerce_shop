import { useEffect, useState, useMemo, Fragment } from 'react'
import { Close, Delete } from '@mui/icons-material'
import {
    Box,
    Card,
    CardHeader,
    Grid,
    Stack,
    ListItem,
    Checkbox,
    Typography,
    List,
    ListItemText,
    IconButton,
    ListItemButton,
    ListItemIcon,
    Divider,
    Tooltip,
    CardContent,
    Button,
    Collapse,
    TextField,
    Paper,
    Switch
} from '@mui/material'
import Image from 'mui-image'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { showToast } from 'src/redux/slice/toastSlice'
import { removeProductFromCart } from 'src/redux/slice/usersSlice'
import { getAUserAPI, getAVoucherAPI, removeProductIdFromCartAPI } from '~/api/main'
import images from '~/assets/imgs'
import useStyles from '~/assets/styles/useStyles'
import paymentMethod from '~/assets/imgs/payment.png'
import { showDialog } from 'src/redux/slice/dialogSlice'
import useScrollToTop from '~/hooks/useScrollToTop'
import useToggle from '~/hooks/useToggle'

const CartItems = ({ onNext, isMatch, setVoucher, voucherCode, setVoucherCode, sumPrice, setSumPrice }) => {
    useScrollToTop()
    const classes = useStyles()
    const token = useSelector(state => state.auth.user?.token)
    const dispatch = useDispatch()

    const [open, setOpen] = useToggle(false)
    const [discount, setDiscount] = useState(0)
    const [checked, setChecked] = useState([])
    const [products, setProducts] = useState([])
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isEditable, setIsEditAble] = useState(true)

    const totalQuantity = useMemo(
        () => checked.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0),
        [checked]
    )
    const totalPrice = useMemo(
        () => checked.reduce((accumulator, currentValue) => accumulator + currentValue.sumPrice, 0),
        [checked]
    )

    useEffect(() => {
        // Khi totalPrice hoặc discount thay đổi, tính toán lại sumPrice
        const newSumPrice = totalPrice - discount
        if (newSumPrice < 0) {
            setSumPrice(0)
        } else {
            setSumPrice(newSumPrice)
        }
    }, [totalPrice, discount, setSumPrice])

    useEffect(() => {
        // Xử lý khi discount không hợp lệ và checked rỗng
        if (discount !== 0 && checked.length === 0) {
            setDiscount(0)
        }
    }, [discount, checked])

    useEffect(() => {
        const fetchCartOfUser = async () => {
            setLoading(true)
            try {
                const user = await getAUserAPI(token)
                setProducts(user.products)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
        }

        fetchCartOfUser()
    }, [token])

    useEffect(() => {
        if (checked.length === 0) {
            setDiscount(0)
            setIsEditAble(true)
        }
    }, [checked])

    const handleNextClick = () => {
        onNext(checked)
        setVoucher(discount)
        if (!open || discount === 0) {
            setVoucher(0)
            setVoucherCode('')
        }
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        if (newChecked.length === products.length) {
            setIsCheckedAll(true)
        } else {
            setIsCheckedAll(false)
        }

        setChecked(newChecked)
    }
    // console.log('Discount===🚀🚀🚀🚀:', discount)

    const handleCheckAll = () => {
        if (isCheckedAll) {
            setChecked([])
        } else {
            const newChecked = products.map(product => product)
            setChecked(newChecked)
        }
        setIsCheckedAll(!isCheckedAll)
    }

    const handleDelete = async value => {
        try {
            const listCheckedId = checked?.map(product => product._id)
            const response = await removeProductIdFromCartAPI(listCheckedId, token)
            if (response.status === 200) {
                dispatch(removeProductFromCart({ productIds: listCheckedId }))
                dispatch(showToast({ type: 'success', message: 'Xóa sản phẩm khỏi giỏ hàng thành công' }))
                const newProducts = products.filter(product => !value.includes(product))
                setProducts(newProducts)
                setChecked([])
            }
        } catch (error) {
            dispatch(showToast({ type: 'error', message: 'Xóa sản phẩm khỏi giỏ hàng thất bại' }))
            console.error(error)
        }
    }

    const handleClick = () => {
        dispatch(
            showDialog({
                title: 'Xóa sản phẩm khỏi giỏ hàng',
                message: `Bạn có chắc muốn xóa các mục này chứ này chứ`,
                onConfirm: () => handleDelete(checked)
            })
        )
    }

    const handleGetVoucher = async () => {
        try {
            const res = await getAVoucherAPI(voucherCode, token)
            const { total, used } = res.data
            if (res.status === 200) {
                if (total !== used) {
                    setDiscount(res.data.discount)
                    setIsEditAble(false)
                    dispatch(showToast({ type: 'success', message: 'Áp dụng mã thành công!' }))
                } else {
                    setError('Voucher đã hết lượt sử dụng')
                }
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data)
        }
    }

    return (
        <Box minHeight='60vh' width={{ sm: '98vw', md: '98vw', xl: 1400 }}>
            <Grid marginTop={2} container spacing={2}>
                <Grid item md={8} xs={12}>
                    <Card className='card mb-4'>
                        <CardHeader title='Giỏ hàng' className='card-header py-3' />
                        <ListItem
                            disablePadding
                            secondaryAction={
                                checked.length > 0 && (
                                    <Tooltip title='Xóa sản phẩm'>
                                        <IconButton onClick={handleClick} aria-label='delete'>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        >
                            {products.length !== 0 && (
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge='start'
                                            tabIndex={-1}
                                            onClick={handleCheckAll}
                                            checked={isCheckedAll}
                                            disableRipple
                                        />
                                    </ListItemIcon>

                                    <Typography variant={isMatch ? 'body1' : 'h6'}>
                                        Chọn tất cả {`(${products.length})`}
                                    </Typography>
                                </ListItemButton>
                            )}
                        </ListItem>

                        {loading ? (
                            <LinearIndeterminate />
                        ) : products.length === 0 ? (
                            <Box className={classes.flexBox} padding={4} flexDirection='column'>
                                <Image
                                    duration={500}
                                    shiftDuration={150}
                                    className='w-25'
                                    src={images.emptyFolder}
                                    alt='Null'
                                />
                                <Stack direction='row' alignItems='center'>
                                    <Typography variant='body1'>
                                        Giỏ hàng rỗng -{' '}
                                        <Typography
                                            component={Link}
                                            color='primary'
                                            to='/products'
                                            className={classes.hoverItem}
                                        >
                                            Mua gì đó chứ ?
                                        </Typography>
                                    </Typography>
                                </Stack>
                            </Box>
                        ) : (
                            <List
                                sx={{
                                    minHeight: '200px'
                                }}
                            >
                                {products?.map(product => {
                                    const labelId = `checkbox-list-label-${product._id}`
                                    return (
                                        <Fragment key={product._id}>
                                            <ListItem disablePadding>
                                                <ListItemButton role={undefined} onClick={handleToggle(product)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge='start'
                                                            checked={checked.includes(product)}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <Box>
                                                        <Image
                                                            duration={500}
                                                            width={isMatch ? 80 : 120}
                                                            height={isMatch ? 80 : 120}
                                                            src={product.productId?.productImages?.[0] || ''}
                                                            alt={product.productId?.name}
                                                        />
                                                    </Box>
                                                    <ListItemText
                                                        sx={{
                                                            marginLeft: '12px'
                                                        }}
                                                        id={labelId}
                                                        primary={
                                                            <Typography
                                                                color='primary'
                                                                variant='h6'
                                                                className={isMatch ? classes.title : ''}
                                                            >
                                                                {product.productId?.name}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <>
                                                                <Typography component='span' variant='body2'>
                                                                    Giá: {product.sumPrice?.toLocaleString('vi-VN')} đ
                                                                </Typography>
                                                                {' | '}
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
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider component='li' variant='fullWidth' />
                                        </Fragment>
                                    )
                                })}
                            </List>
                        )}
                    </Card>
                    {!isMatch && (
                        <Card className='card mb-4 mb-lg-0'>
                            <CardContent className='card-body'>
                                <Typography fontWeight={600}>Có thể thanh toán bằng ví điện tử</Typography>
                                <Image duration={500} alt='Payment methods' width='250px' src={paymentMethod} />
                            </CardContent>
                        </Card>
                    )}
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card position='sticky' className='card mb-4'>
                        <CardHeader title='Tổng giá' className='card-header' />
                        <CardContent>
                            <Box>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='h6'>Tổng số sản phẩm</Typography>
                                    <Typography variant='h6' color='primary'>
                                        {checked.length}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='h6'>Tổng số lượng</Typography>
                                    <Typography variant='h6' color='primary'>
                                        {totalQuantity}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='h6'>Mã giảm giá</Typography>
                                    <Typography variant='h6' color='primary'>
                                        {(open && discount?.toLocaleString('vi-VN') + ' đ') || 'Chưa áp dụng'}
                                    </Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='h6'>Tiền ship</Typography>
                                    <Typography variant='h6' color='primary'>
                                        Free ship
                                    </Typography>
                                </Stack>
                            </Box>
                        </CardContent>
                        <Divider variant='fullWidth' component='div' />
                        <Box>
                            <CardContent>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='h6'>Tổng số tiền</Typography>
                                    <Typography variant='h6' color='error'>
                                        {sumPrice.toLocaleString('vi-VN')} đ
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Box>
                    </Card>
                    <Paper
                        sx={{ display: checked.length === 0 && 'none', mb: 3, transition: 'all ease-in-out 0.3s' }}
                        elevation={3}
                        bgcolor='white'
                    >
                        <List disablePadding>
                            <ListItem>
                                <ListItemText primary={<Typography variant='h6'>Dùng mã giảm giá</Typography>} />
                                <Switch checked={open} onChange={setOpen} />
                            </ListItem>
                            <Collapse in={open} timeout='auto' unmountOnExit>
                                <Box component='form' minHeight={40} p={1}>
                                    {isEditable ? (
                                        <>
                                            <Typography variant='body1' color='error'>
                                                {error}
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                value={voucherCode}
                                                placeholder='Nhập mã...'
                                                onChange={e => setVoucherCode(e.target.value)}
                                                sx={{ mb: 1 }}
                                            />
                                            <Button onClick={handleGetVoucher} variant='outlined'>
                                                Áp dụng
                                            </Button>
                                        </>
                                    ) : (
                                        <Stack direction='row' justifyContent='space-between'>
                                            <Typography p={1}>{voucherCode}</Typography>
                                            <IconButton
                                                onClick={() => {
                                                    setIsEditAble(true)
                                                    setDiscount(0)
                                                }}
                                                aria-label='close voucher'
                                            >
                                                <Close fontSize='small' />
                                            </IconButton>
                                        </Stack>
                                    )}
                                </Box>
                            </Collapse>
                        </List>
                    </Paper>
                    <Button onClick={handleNextClick} disabled={checked.length === 0} variant='contained'>
                        Đặt hàng ngay
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItems

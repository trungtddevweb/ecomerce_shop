import { Delete } from '@mui/icons-material'
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
    Button
} from '@mui/material'
import Image from 'mui-image'
import { Fragment } from 'react'
import { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { showToast } from 'src/redux/slice/toastSlice'
import { removeProductFromCart } from 'src/redux/slice/usersSlice'
import { getAUserAPI, removeProductIdFromCartAPI } from '~/api/main'
import images from '~/assets/imgs'
import useStyles from '~/assets/styles/useStyles'
import paymentMethod from '~/assets/imgs/payment.png'

const CartItems = ({ onNext }) => {
    const classes = useStyles()
    const [checked, setChecked] = useState([])
    const [products, setProducts] = useState([])
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const totalQuantity = useMemo(
        () => checked.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0),
        [checked]
    )
    const totalPrice = useMemo(
        () => checked.reduce((accumulator, currentValue) => accumulator + currentValue.sumPrice, 0),
        [checked]
    )

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

    const handleNextClick = () => {
        onNext(checked)
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        // console.log(checked)
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

    return (
        <Box width={1400}>
            <Grid container className='row d-flex justify-content-center my-4'>
                <Grid item className='col-md-8'>
                    <Card className='card mb-4'>
                        <CardHeader title='Giỏ hàng' className='card-header py-3' />
                        <ListItem
                            disablePadding
                            secondaryAction={
                                checked.length > 0 && (
                                    <Tooltip title='Xóa sản phẩm'>
                                        <IconButton onClick={() => handleDelete(checked)} aria-label='delete'>
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

                                    <Typography variant='h6'>Chọn tất cả {`(${products.length})`}</Typography>
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
                                {products.map(product => {
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
                                                    <Image
                                                        duration={500}
                                                        width={120}
                                                        height={120}
                                                        src={product.productId.productImages?.[0]}
                                                        alt={product.productId.name}
                                                    />
                                                    <ListItemText
                                                        sx={{
                                                            marginLeft: '12px'
                                                        }}
                                                        id={labelId}
                                                        primary={
                                                            <Typography color='primary' variant='h6'>
                                                                {product.productId.name}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <>
                                                                <Typography component='span' variant='body2'>
                                                                    Giá: {product.sumPrice?.toLocaleString('vi-VN')} VNĐ
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
                    <Card className='card mb-4 mb-lg-0'>
                        <CardContent className='card-body'>
                            <Typography fontWeight={600}>Có thể thanh toán bằng ví điện tử</Typography>
                            <Image duration={500} alt='Payment methods' width='250px' src={paymentMethod} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className='col-md-4'>
                    <Card position='sticky' className='card mb-4'>
                        <CardHeader title='Tổng giá' className='card-header py-3' />
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
                                        {totalPrice.toLocaleString('vi-VN')} VNĐ
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Box>
                    </Card>
                    <Button onClick={handleNextClick} disabled={checked.length === 0} variant='contained'>
                        Đặt hàng ngay
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItems

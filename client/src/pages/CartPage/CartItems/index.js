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
    Tooltip
} from '@mui/material'
import Image from 'mui-image'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { showToast } from 'src/redux/slice/toastSlice'
import { removeProductFromCart } from 'src/redux/slice/usersSlice'
import { getAUserAPI, removeProductIdFromCartAPI } from '~/api/main'
import images from '~/assets/imgs'
import useStyles from '~/assets/styles/useStyles'

const CartItems = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState([])
    const [products, setProducts] = useState([])
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1 // add 1 because getMonth() returns 0-11
    const year = currentDate.getFullYear()
    const formattedDate = `${day}-${month}-${year}`

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

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
    }

    const handleCheckAll = () => {
        if (isCheckedAll) {
            setChecked([])
        } else {
            const newChecked = products.map(product => product._id)
            setChecked(newChecked)
        }
        setIsCheckedAll(!isCheckedAll)
    }

    const handleDelete = async value => {
        try {
            const response = await removeProductIdFromCartAPI(checked, token)
            if (response.status === 200) {
                dispatch(removeProductFromCart({ productIds: checked }))
                dispatch(showToast({ type: 'success', message: 'Xóa sản phẩm khỏi giỏ hàng thành công' }))
                const newProducts = products.filter(product => !value.includes(product._id.toString()))
                setProducts(newProducts)
                setChecked([])
            }
        } catch (error) {
            dispatch(showToast({ type: 'error', message: 'Xóa sản phẩm khỏi giỏ hàng thất bại' }))
            console.error(error)
        }
    }

    return (
        <Box>
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
                            <Box className={classes.flexBox} flexDirection='column'>
                                <Stack direction='row' alignItems='center'>
                                    <Typography>Giỏ hàng rỗng. </Typography>
                                    <Typography
                                        component={Link}
                                        className={classes.hoverItem}
                                        color='primary'
                                        to='/products'
                                        variant='h6'
                                    >
                                        Mua hàng ngay!
                                    </Typography>
                                </Stack>
                                <Image
                                    duration={500}
                                    shiftDuration={150}
                                    className='w-25'
                                    src={images.emptyFolder}
                                    alt='Null'
                                />
                            </Box>
                        ) : (
                            <List>
                                {products.map(product => {
                                    const labelId = `checkbox-list-label-${product._id}`

                                    return (
                                        <Fragment key={product._id}>
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    role={undefined}
                                                    onClick={handleToggle(product._id)}
                                                    dense
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge='start'
                                                            checked={checked.includes(product._id)}
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
                    {/* <div className='card mb-4 mb-lg-0'>
                        <div className='card-body'>
                            <p>
                                <strong>We accept</strong>
                            </p>
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg'
                                alt='Visa'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg'
                                alt='American Express'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg'
                                alt='Mastercard'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp'
                                alt='PayPal acceptance mark'
                            />
                        </div>
                    </div> */}
                </Grid>
                <Grid item className='col-md-4'>
                    <Card position='sticky' className='card mb-4'>
                        <CardHeader title='Tổng giá' className='card-header py-3' />
                        <div className='card-body'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                                    Products
                                    <span>$53.98</span>
                                </li>
                                <li className='list-group-item d-flex justify-content-between align-items-center px-0'>
                                    Shipping
                                    <span>Gratis</span>
                                </li>
                                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p className='mb-0'>(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span>
                                        <strong>$53.98</strong>
                                    </span>
                                </li>
                            </ul>
                            <button type='button' className='btn btn-primary btn-lg btn-block'>
                                Go to checkout
                            </button>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItems

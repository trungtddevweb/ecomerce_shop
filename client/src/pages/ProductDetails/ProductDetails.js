import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Link as LinkMUI,
    Stack,
    TextField,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    useTheme,
    useMediaQuery
} from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import { useEffect, lazy, useState } from 'react'
import { addProductIdToCartAPI, getProductByIdAPI } from '~/api/main'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { AddShoppingCart, NavigateNext } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from 'src/redux/slice/usersSlice'
import { showToast } from 'src/redux/slice/toastSlice'
import useScrollToTop from '~/hooks/useScrollToTop'
const AnotherProductByCategory = lazy(() => import('./AnotherProduct'))
const SliderImagesProduct = lazy(() => import('./SlideImagesProduct'))

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    useDocumentTitle(product?.name)
    useScrollToTop()
    const { productId } = useParams()
    const classes = useStyles()
    const [countQuantity, setCountQuantity] = useState(1)
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const totalPrice = Number(product.price * countQuantity) || 0
    const valueOfField = product.category?.split(' ')[0]

    const [selectedSize, setSelectedSize] = useState()
    const [selectedColor, setSelectedColor] = useState()

    const handleChangeSize = (event, newAlignment) => {
        setSelectedSize(newAlignment)
    }
    const handleChangeColor = (event, newAlignment) => {
        setSelectedColor(newAlignment)
    }

    useEffect(() => {
        const fetchProduct = async productId => {
            try {
                const response = await getProductByIdAPI(productId)
                setProduct(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct(productId)
    }, [productId])

    useEffect(() => {
        if (product && !selectedSize && !selectedColor) {
            setSelectedSize(product.sizes?.[0])
            setSelectedColor(product.colors?.[0])
        }
    }, [product, selectedSize, selectedColor])

    const increaseQuantity = () => {
        const newValue = parseInt(countQuantity) + 1
        setCountQuantity(newValue)
    }

    const decreaseQuantity = () => {
        const newValue = parseInt(countQuantity) - 1
        setCountQuantity(newValue)
    }

    const handleInputChange = event => {
        const inputValue = event.target.value

        // Kiểm tra giá trị nhập vào
        if (/^([0-9]+)?$/.test(inputValue) && inputValue >= 0 && inputValue <= product.quantity) {
            // Nếu giá trị hợp lệ thì gán giá trị cho state
            setCountQuantity(parseInt(inputValue))
        } else if (inputValue > product.quantity) {
            // Nếu giá trị lớn hơn 100, tự động điền là 100
            setCountQuantity(product.quantity)
        } else {
            // Nếu giá trị không hợp lệ thì gán giá trị là 0
            setCountQuantity(1)
        }
    }

    const handleAddToCart = async () => {
        try {
            const data = {
                productId: product._id,
                quantity: countQuantity,
                size: selectedSize,
                color: selectedColor
            }
            const res = await addProductIdToCartAPI(token, data)
            if (res.status === 200) {
                dispatch(addProductToCart(res.data))
                dispatch(showToast({ type: 'success', message: 'Thêm vào giỏ hàng thành công!' }))
            }
        } catch (err) {
            dispatch(showToast({ type: 'error', message: err.response.data.error || 'Thêm thất bại!' }))
        }
    }
    const handleBuyNow = async () => {
        try {
            const data = {
                productId: product._id,
                quantity: countQuantity,
                size: selectedSize,
                color: selectedColor
            }
            const res = await addProductIdToCartAPI(token, data)
            if (res.status === 200) {
                dispatch(addProductToCart(res.data))
                navigate('/cart')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Box display='flex' padding={1} justifyContent='center' marginY={4}>
            <Box
                sx={{
                    width: {
                        md: '1400px'
                    }
                }}
            >
                <Box paddingX={isMatch ? 0 : 4}>
                    <Breadcrumbs separator={<NavigateNext fontSize='small' />} marginBottom={4} aria-label='breadcrumb'>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/'
                        >
                            Trang chủ
                        </LinkMUI>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/products'
                        >
                            Sản phẩm
                        </LinkMUI>
                        <Typography color='primary'>Chi tiết sản phẩm</Typography>
                    </Breadcrumbs>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <SliderImagesProduct isMatch={isMatch} images={product} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box component='form'>
                                <Typography variant={isMatch ? 'h6' : 'h4'} minHeight={100}>
                                    {product.name}
                                </Typography>
                                <Typography
                                    className={classes.limitLines}
                                    minHeight={116}
                                    variant='subtitle1'
                                    color='GrayText'
                                >
                                    {product.desc}
                                </Typography>
                                <Typography
                                    component='div'
                                    className={classes.limitLines}
                                    minHeight={50}
                                    variant='body1'
                                    color='GrayText'
                                >
                                    Xuất xứ :{' '}
                                    <Typography variant={isMatch ? 'body1' : 'h6'} color='primary' component='span'>
                                        {product.brand}
                                    </Typography>
                                </Typography>
                                <Stack className={classes.limitLines} minHeight={80}>
                                    <Typography>Màu sắc : </Typography>
                                    <ToggleButtonGroup
                                        color='primary'
                                        required
                                        value={selectedColor}
                                        exclusive
                                        onChange={handleChangeColor}
                                        aria-label='Select color'
                                    >
                                        {product.colors?.map(color => (
                                            <ToggleButton key={color} value={color}>
                                                {color}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </Stack>
                                <Stack className={classes.limitLines} minHeight={80}>
                                    <Typography>Kích thước : </Typography>
                                    <ToggleButtonGroup
                                        color='primary'
                                        value={selectedSize}
                                        exclusive
                                        onChange={handleChangeSize}
                                        aria-label='Select Size'
                                    >
                                        {product.sizes?.map(size => (
                                            <ToggleButton key={size} value={size}>
                                                {size}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </Stack>
                                <Typography
                                    component='div'
                                    className={classes.limitLines}
                                    variant='body1'
                                    color='GrayText'
                                >
                                    Chọn số lượng
                                    <Stack direction='row'>
                                        <Button
                                            variant='outlined'
                                            size='small'
                                            disabled={countQuantity <= 1}
                                            onClick={decreaseQuantity}
                                        >
                                            -
                                        </Button>
                                        <TextField
                                            sx={{
                                                width: '80px'
                                            }}
                                            type='number'
                                            max={product.quantity}
                                            value={countQuantity}
                                            onInput={handleInputChange}
                                            InputProps={{
                                                inputProps: {
                                                    min: 0,
                                                    max: product.quantity,
                                                    style: { textAlign: 'center' },
                                                    pattern: '[0-9]*([.,][0-9]+)?',
                                                    step: 1,
                                                    onKeyDown: event => {
                                                        const charCode = event.which ? event.which : event.keyCode
                                                        if (
                                                            event.key !== 'Backspace' &&
                                                            (charCode === 45 ||
                                                                charCode === 101 ||
                                                                charCode === 69 ||
                                                                charCode === 46 ||
                                                                charCode === 44 ||
                                                                charCode < 48 ||
                                                                charCode > 57)
                                                        ) {
                                                            event.preventDefault()
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                        <Button
                                            disabled={countQuantity >= product.quantity}
                                            size='small'
                                            variant='outlined'
                                            onClick={increaseQuantity}
                                        >
                                            +
                                        </Button>
                                    </Stack>
                                </Typography>
                                <Typography color='GrayText' marginY={2} fontStyle='italic' variant='subtitle2'>
                                    Trong kho còn lại {product.quantity}
                                </Typography>
                                <Typography marginY={2} variant={isMatch ? 'h6' : 'h4'} color='red'>
                                    Giá: {totalPrice.toLocaleString('vi-VN')} VNĐ
                                </Typography>
                                <Stack direction='row' spacing={2}>
                                    <Button
                                        size={isMatch ? 'medium' : 'large'}
                                        startIcon={<AddShoppingCart fontSize='large' />}
                                        variant='contained'
                                        color='error'
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        size={isMatch ? 'medium' : 'large'}
                                        variant='contained'
                                        onClick={handleBuyNow}
                                    >
                                        Mua ngay
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                    <AnotherProductByCategory
                        isMatch={isMatch}
                        fields='category'
                        productId={productId}
                        value={valueOfField}
                        title='Các sản phẩm cùng loại'
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductDetails

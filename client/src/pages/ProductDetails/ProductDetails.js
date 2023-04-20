import { useParams, Link } from 'react-router-dom'
import {
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Link as LinkMUI,
    Paper,
    Stack,
    TextField,
    Typography,
    RadioGroup,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import { useEffect } from 'react'
import { getProductByIdAPI } from '~/api/main'
import { useState } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { AddShoppingCart, NavigateNext } from '@mui/icons-material'
import { Image } from 'mui-image'
import { useDispatch } from 'react-redux'
import { addProductToCart } from 'src/redux/slice/usersSlice'

const ProductDetails = () => {
    const { productId } = useParams()
    const classes = useStyles()
    const [product, setProduct] = useState({})
    const [countQuantity, setCountQuantity] = useState(1)
    const dispatch = useDispatch()
    useDocumentTitle(product?.name)

    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')

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

    const handleAddToCart = () => {}
    const handleBuyNow = () => {
        dispatch(addProductToCart())
    }

    return (
        <Box display='flex' justifyContent='center' marginY={4}>
            <Box width={1400}>
                <Box>
                    <Breadcrumbs separator={<NavigateNext fontSize='small' />} marginBottom={2} aria-label='breadcrumb'>
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
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Paper elevation={6}>
                                <Image src={product.productImages?.[0]} />
                            </Paper>
                            <Typography>Slide Image</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Box component='form'>
                                <Typography variant='h4' minHeight={100}>
                                    {product.name}
                                </Typography>
                                <Typography
                                    className={classes.limitLines}
                                    minHeight={180}
                                    variant='subtitle1'
                                    color='GrayText'
                                >
                                    {product.desc}
                                </Typography>
                                <Typography
                                    component='div'
                                    className={classes.limitLines}
                                    minHeight={80}
                                    variant='body1'
                                    color='GrayText'
                                >
                                    Xuất xứ :{' '}
                                    <Typography variant='h6' color='primary' component='span'>
                                        {product.brand}
                                    </Typography>
                                </Typography>
                                <Stack className={classes.limitLines} minHeight={80}>
                                    <Typography>Màu sắc : </Typography>
                                    <ToggleButtonGroup
                                        color='secondary'
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
                                        color='secondary'
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
                                <Stack direction='row' spacing={2}>
                                    <Button
                                        size='large'
                                        startIcon={<AddShoppingCart fontSize='large' />}
                                        variant='contained'
                                        color='error'
                                        onClick={() => handleAddToCart(product._id)}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button size='large' variant='contained' onClick={handleBuyNow}>
                                        Mua ngay
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography>Another product </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductDetails

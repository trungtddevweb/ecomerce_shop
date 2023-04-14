import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Stack,
    Typography
} from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import imageFallback from '~/assets/imgs/noImage.png'
import { Link } from 'react-router-dom'
import { AddShoppingCart } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addProductToCart } from 'src/redux/slice/usersSlice'

const CardProductItem = ({ data }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleAdd = product => {
        dispatch(addProductToCart(product))
    }

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component='img'
                    alt='Product Image'
                    height='140'
                    image={data.productImages[0] || imageFallback}
                />
                <CardContent>
                    <Typography gutterBottom minHeight={64} className={classes.title}>
                        {data.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {data.colors.length} màu
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {data.sizes.length} kích cỡ
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Thương hiệu: {data.brand}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Giá: {data.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider color='gray' />
            <CardActions>
                <Stack spacing={3} direction='row'>
                    <Button
                        color='secondary'
                        onClick={() => handleAdd(data)}
                        startIcon={<AddShoppingCart />}
                        size='small'
                        variant='contained'
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button variant='contained' component={Link} to={`/products/${data._id}`} size='small'>
                        Chi tiết
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    )
}

export default CardProductItem

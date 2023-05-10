import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import imageFallback from '~/assets/imgs/noImage.png'
import { Link } from 'react-router-dom'

const CardProductItem = ({ data }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Link to={`/products/${data._id}`}>
            <Card sx={{ minHeight: '200px' }}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        alt='Product Image'
                        height='140'
                        image={data.productImages[0] || imageFallback}
                    />
                    <CardContent>
                        {isMatch ? (
                            <>
                                <Typography gutterBottom minHeight={50} className={classes.title}>
                                    {data.name}
                                </Typography>
                                <Typography variant='body2' component='p' color='error'>
                                    {data.price.toLocaleString('vi-VN')} VNĐ
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography gutterBottom minHeight={50} className={classes.title}>
                                    {data.name}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {data.colors.length} màu
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {data.sizes.length} kích cỡ
                                </Typography>
                                <Typography
                                    minHeight={{ md: '40px', lg: 'auto' }}
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    Thương hiệu: {data.brand}
                                </Typography>
                                <Typography variant='body2' component='p' color='text.secondary'>
                                    Giá:{' '}
                                    <Typography component='span' color='error'>
                                        {data.price.toLocaleString('vi-VN')}
                                    </Typography>{' '}
                                    VNĐ
                                </Typography>
                            </>
                        )}
                    </CardContent>
                    <Divider color='gray' />
                    <Typography color='text.secondary' padding='8px 16px' variant='body1'>
                        {data.location || 'Hà Nội'}
                    </Typography>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default CardProductItem

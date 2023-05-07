import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, Paper, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import { useState, useEffect, lazy, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import { getProductByFieldAPI } from '~/api/main'
import useStyles from '~/assets/styles/useStyles'
const RandomProduct = lazy(() => import('./RandomProduct'))

const SearchPage = () => {
    const [data, setData] = useState(null)
    const [products, setProducts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [limit, setLimit] = useState(10)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search.toString())
    const nameValue = queryParams.get('name')
    const classes = useStyles()

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                setIsFetching(true)
                const res = await getProductByFieldAPI('name', nameValue, limit)
                setData(res)
                setProducts(res.docs)
                setIsFetching(false)
            } catch (error) {
                console.error(error)
                setIsFetching(false)
            }
        }
        fetchedProducts()
    }, [limit, nameValue])

    const loadMore = async () => {
        try {
            // setIsFetching(true)
            const res = await getProductByFieldAPI('name', nameValue, limit + 10)
            setProducts([...products, ...res.docs])
            setLimit(limit + 10)
            setIsFetching(false)
        } catch (err) {
            console.error(err)
            setIsFetching(false)
        }
    }
    const hasMore = data?.totalDocs > products.length

    return (
        <Box display='flex' minHeight='100vh' justifyContent='center'>
            <Box width={1400} padding={2}>
                <Typography marginBottom={3} variant='h6' color='primary'>
                    Tìm kiếm sản phẩm
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Paper elevation={3}>
                            <Box padding={2}>
                                <Typography component='div' padding={2} variant='body1' fontWeight={600}>
                                    Kết quả tìm kiếm cho:{' '}
                                    <Typography component='span' color='secondary'>
                                        "{nameValue}"
                                    </Typography>
                                </Typography>
                                <Divider component='div' variant='fullWidth' />
                                {isFetching ? (
                                    <Box>
                                        <SkeletonFallback height='120px' />
                                        <SkeletonFallback width='100%' />
                                        <SkeletonFallback width='100%' />
                                        <SkeletonFallback width='90%' />
                                    </Box>
                                ) : (
                                    <Fragment>
                                        <List disablePadding>
                                            {products.map(product => (
                                                <Link className={classes.hoverItem} to={`/products/${product._id}`}>
                                                    <ListItem key={product._id}>
                                                        <ListItemButton>
                                                            <Stack spacing={1} direction='row'>
                                                                <Image
                                                                    width='150px'
                                                                    height='150px'
                                                                    alt={product.name}
                                                                    src={product.productImages?.[0]}
                                                                    duration={500}
                                                                />
                                                                <Stack spacing={1}>
                                                                    <Typography
                                                                        variant='body1'
                                                                        fontWeight={600}
                                                                        color='primary'
                                                                    >
                                                                        {product.name}
                                                                    </Typography>
                                                                    <Typography variant='body2' fontStyle='initial'>
                                                                        {product.colors.length} màu sắc
                                                                    </Typography>
                                                                    <Typography variant='body2' fontStyle='initial'>
                                                                        {product.sizes.length} kích thước
                                                                    </Typography>
                                                                    <Typography variant='body2' fontStyle='initial'>
                                                                        Thương hiệu: {product.brand}
                                                                    </Typography>
                                                                    <Typography
                                                                        component='div'
                                                                        variant='body2'
                                                                        fontStyle='initial'
                                                                    >
                                                                        Giá tiền:{' '}
                                                                        <Typography component='span' color='error'>
                                                                            {product.price.toLocaleString('vi-VN')} VNĐ
                                                                        </Typography>
                                                                    </Typography>
                                                                </Stack>
                                                            </Stack>
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Link>
                                            ))}
                                        </List>
                                        {products.length === 0 && (
                                            <Typography padding={2} color='error'>
                                                Không có kêt quả tìm kiếm phù hợp!
                                            </Typography>
                                        )}
                                    </Fragment>
                                )}
                            </Box>
                            {hasMore && (
                                <Grid item xs={12} className={classes.flexBox}>
                                    <Button onClick={loadMore}>Xem thêm</Button>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <RandomProduct nameValue={nameValue} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default SearchPage

import { useState, useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'mui-image'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import flashSale from '~/assets/imgs/flash-sale.jpg'
import { getAllProductByQueryAPI } from '~/api/main'
import CardProductItem from '~/components/CardProductItem'
import FilterList from './FilterList'
import useStyles from '~/assets/styles/useStyles'

const ProductPage = () => {
    const [limit, setLimit] = useState(10)
    const [data, setData] = useState([])
    const [products, setProducts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [url, setUrl] = useState('')
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    useDocumentTitle('Sản phẩm')
    useScrollToTop()
    const classes = useStyles()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsFetching(true)
                const res = await getAllProductByQueryAPI(limit, url)
                setProducts(res.docs)
                setData(res)
                setIsFetching(false)
            } catch (error) {
                console.error(error)
                setIsFetching(false)
            }
        }
        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const loadMore = async () => {
        try {
            setIsFetching(true)
            const res = await getAllProductByQueryAPI(limit + 10, url)
            setProducts(res.docs)
            setLimit(limit + 10)
            setIsFetching(false)
        } catch (err) {
            console.error(err)
            setIsFetching(false)
        }
    }
    const hasMore = data.totalDocs > products.length

    return (
        <Box
            p={1}
            sx={{
                display: {
                    xs: 'flow-root',
                    md: 'flex'
                }
            }}
            marginY={isMatch ? 2 : 5}
            justifyContent='center'
        >
            <Box
                sx={{
                    width: {
                        md: '1400px'
                    }
                }}
            >
                {!isMatch && <Image src={flashSale} duration={500} alt='Flash sale' height={300} />}
                <Grid marginY={2} container spacing={2}>
                    <Grid xs={12} md={3} item>
                        <Paper>
                            <FilterList isMatch={isMatch} url={url} setUrl={setUrl} />
                        </Paper>
                    </Grid>
                    <Grid xs={12} md={9} item spacing={2} container>
                        {isFetching ? (
                            <Stack width='100%' minHeight='60vh' className={classes.flexBox}>
                                <CircularProgress color='secondary' />
                                <Typography variant='subtitle1'>Đang tìm kiếm...</Typography>
                            </Stack>
                        ) : (
                            <>
                                {products.map((product, index) => (
                                    <Grid item key={index} xs={6} md={3}>
                                        <Paper elevation={6}>
                                            <CardProductItem data={product} />
                                        </Paper>
                                    </Grid>
                                ))}

                                {products.length === 0 && (
                                    <Grid item xs={12} md={3}>
                                        <Box elevation={6}>
                                            <Typography variant='body1' color='primary'>
                                                Không có sản phẩm nào phù hợp!
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </>
                        )}

                        {hasMore && (
                            <Grid item xs={12} className={classes.flexBox}>
                                <Button onClick={loadMore}>Xem thêm</Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductPage

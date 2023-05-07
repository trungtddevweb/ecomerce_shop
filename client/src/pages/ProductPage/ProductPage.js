import { useState, useEffect } from 'react'
import { Box, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import flashSale from '~/assets/imgs/flash-sale.jpg'
import { getAllProductByQueryAPI } from '~/api/main'
import CardProductItem from '~/components/CardProductItem'
import FilterList from './FilterList'
import useStyles from '~/assets/styles/useStyles'

const ProductPage = () => {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [url, setUrl] = useState('')

    useDocumentTitle('Sản phẩm')
    useScrollToTop()
    const classes = useStyles()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsFetching(true)
                const res = await getAllProductByQueryAPI(url)
                setProducts(res.docs)
                setIsFetching(false)
            } catch (error) {
                console.error(error)
                setIsFetching(false)
            }
        }
        fetchProducts()
    }, [page, url])
    return (
        <Box display='flex' marginY={5} justifyContent='center'>
            <Box width={1400}>
                <Image src={flashSale} duration={500} alt='Flash sale' height={300} />
                <Grid marginY={2} container spacing={2}>
                    <Grid xs={3} item>
                        <Paper>
                            <FilterList url={url} setUrl={setUrl} />
                        </Paper>
                    </Grid>
                    <Grid xs={9} item spacing={2} container>
                        {isFetching ? (
                            <Stack width='100%' className={classes.flexBox}>
                                <CircularProgress color='secondary' />
                                <Typography variant='subtitle1'>Đang tìm kiếm...</Typography>
                            </Stack>
                        ) : (
                            <>
                                {products.map((product, index) => (
                                    <Grid item key={index} xs={3}>
                                        <Paper elevation={6}>
                                            <CardProductItem data={product} />
                                        </Paper>
                                    </Grid>
                                ))}
                                {products.length === 0 && (
                                    <Grid item xs={3}>
                                        <Box elevation={6}>
                                            <Typography variant='body1' color='primary'>
                                                Không có sản phẩm nào phù hợp!
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductPage

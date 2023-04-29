import { Box, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CardProductItem from '../../../components/CardProductItem'
import { getAllProducts } from '~/api/main'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useStyles from '~/assets/styles/useStyles'

const NewLastestProduct = () => {
    // const classes = useStyles()
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const products = await getAllProducts()
                setIsLoading(false)
                setLists(products.docs)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchProducts()
    }, [])
    const sortedData = [...lists].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <Box display='flex' marginY={6} alignItems='center' flexDirection='column'>
            <Box width={1400}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        Những sản phẩm mới nhất
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        className={classes.hoverItem}
                        component={Link}
                        to='/products'
                        color='blue'
                    >
                        Xem thêm {'>>'}
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    {(isLoading ? Array.from(new Array(5)) : sortedData).map((list, index) => (
                        <Grid item key={list?._id || index} xs={2.4}>
                            {list ? (
                                <CardProductItem data={list} />
                            ) : (
                                <Box>
                                    <SkeletonFallback height={200} />
                                    <SkeletonFallback height={50} />
                                    <SkeletonFallback />
                                    <SkeletonFallback width='80%' />
                                    <SkeletonFallback />
                                </Box>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default NewLastestProduct

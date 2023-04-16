import { Box, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CardProductItem from '../CardProductItem'
import { getProductsByHot } from '~/api/main'
import { optionsQuery } from 'src/utils/const'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'

const ListProducts = ({ title, ...props }) => {
    // const classes = useStyles()
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const products = await getProductsByHot(optionsQuery.limit, optionsQuery.page)
                setIsLoading(false)
                setLists(products.docs)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <Box display='flex' marginY={6} alignItems='center' flexDirection='column'>
            <Box width={1400}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        {title}
                    </Typography>
                    <Typography variant='subtitle2' component={Link} to='/' color='blue'>
                        Xem thêm {'>>'}
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    {(isLoading ? Array.from(new Array(5)) : lists).map((list, index) => (
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

export default ListProducts

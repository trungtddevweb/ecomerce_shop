import { Box, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState, useMemo, memo } from 'react'
import CardProductItem from '~/components/CardProductItem'
import { getProductByFieldAPI } from '~/api/main'
import { optionsQueryAnotherProduct } from 'src/utils/const'
import { Link } from 'react-router-dom'
import useStyles from '~/assets/styles/useStyles'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'

const AnotherProductByCategory = ({ title, fields, value, productId, isMatch }) => {
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProductByFieldAPI(
                    fields,
                    value,
                    optionsQueryAnotherProduct.limit,
                    optionsQueryAnotherProduct.page
                )
                setIsLoading(false)
                setLists(products.docs)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchProducts()
    }, [fields, value])

    const processedResult = useMemo(
        () => lists.filter(item => !(item._id && item._id === productId)),
        [lists, productId]
    )
    return (
        <Box display='flex' marginY={6} flexDirection='column'>
            <Box
                sx={{
                    width: {
                        xl: 1400
                    }
                }}
            >
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        {title}
                    </Typography>
                    {processedResult.length > 6 && !isMatch && (
                        <Typography
                            className={classes.hoverItem}
                            variant='subtitle2'
                            component={Link}
                            to='/blogs'
                            color='blue'
                        >
                            Xem thêm {'>>'}
                        </Typography>
                    )}
                </Stack>
                {processedResult.length === 0 && (
                    <Typography variant='subtitle1' color='GrayText' padding={2}>
                        Không có sản phẩm nào!
                    </Typography>
                )}
                <Grid container minHeight={360} spacing={2}>
                    {(isLoading ? Array.from(new Array(6)) : processedResult).map((list, index) => (
                        <Grid item key={list?._id || index} xs={6} sm={4} md={2}>
                            {list ? (
                                <CardProductItem data={list} />
                            ) : (
                                <Box width={{ md: 150, lg: 190, xl: 220 }}>
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

export default memo(AnotherProductByCategory)

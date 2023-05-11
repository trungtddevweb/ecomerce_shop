import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import CardProductItem from '../../../components/CardProductItem'
import { getAllProducts } from '~/api/main'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useStyles from '~/assets/styles/useStyles'
import routes from 'src/utils/routes'

const NewLastestProduct = () => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
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
        <Box
            p={2}
            marginY={isMatch ? 2 : 6}
            sx={{
                display: 'flex',
                alignItems: {
                    md: 'center'
                },
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    width: {
                        xl: '1400px',
                        sm: 'auto'
                    }
                }}
            >
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        Những sản phẩm mới nhất
                    </Typography>
                    {!isMatch && (
                        <Typography
                            variant='subtitle2'
                            className={classes.hoverItem}
                            component={Link}
                            to='/products'
                            color='blue'
                        >
                            Xem thêm {'>>'}
                        </Typography>
                    )}
                </Stack>
                <Grid container spacing={2}>
                    {(isLoading ? Array.from(new Array(5)) : sortedData).map((list, index) => (
                        <Grid item key={list?._id || index} xs={6} sm={4} md={2.4}>
                            {list ? (
                                <CardProductItem data={list} />
                            ) : (
                                <Box width={{ md: 160, lg: 230, xl: 245 }}>
                                    <SkeletonFallback height={200} />
                                    <SkeletonFallback height={50} />
                                    <SkeletonFallback />
                                    <SkeletonFallback width='80%' />
                                    <SkeletonFallback />
                                </Box>
                            )}
                        </Grid>
                    ))}
                    {isMatch && (
                        <Grid item xs={12} className={classes.flexBox}>
                            <Link to={routes.product.path}>
                                <Button size='small'>Xem thêm</Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default NewLastestProduct

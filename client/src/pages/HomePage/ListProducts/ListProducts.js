import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import CardProductItem from '../../../components/CardProductItem'
import { getProductsByHot } from '~/api/main'
import { optionsQuery } from 'src/utils/const'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useStyles from '~/assets/styles/useStyles'
import routes from 'src/utils/routes'

const ListProducts = ({ title }) => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
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
                        md: '1400px'
                    }
                }}
            >
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        {title}
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
                    {(isLoading ? Array.from(new Array(5)) : lists).map((list, index) => (
                        <Grid item key={list?._id || index} xs={6} md={2.4}>
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

export default ListProducts

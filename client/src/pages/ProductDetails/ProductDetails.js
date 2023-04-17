import { useParams, Link } from 'react-router-dom'
import { Box, Breadcrumbs, Grid, Link as LinkMUI, Paper, Typography } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import { useEffect } from 'react'
import { getProductByIdAPI } from '~/api/main'
import { useState } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { NavigateNext } from '@mui/icons-material'
import { Image } from 'mui-image'

const ProductDetails = () => {
    const { productId } = useParams()
    const classes = useStyles()
    const [product, setProduct] = useState({})
    useDocumentTitle(product?.name)

    useEffect(() => {
        const fetchProduct = async productId => {
            try {
                const response = await getProductByIdAPI(productId)
                setProduct(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct(productId)
    }, [productId])

    return (
        <Box className='productDetails-page' display='flex' justifyContent='center'>
            <Box className='productDetails-wrapper'>
                <Box>
                    <Breadcrumbs separator={<NavigateNext fontSize='small' />} aria-label='breadcrumb'>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/'
                        >
                            Trang chủ
                        </LinkMUI>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/products'
                        >
                            Sản phẩm
                        </LinkMUI>
                        <Typography color='primary'>Chi tiết sản phẩm</Typography>
                    </Breadcrumbs>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <Paper elevation={6}>
                                <Image src={product.productImages?.[0]} />
                            </Paper>
                            <Typography>Slide Image</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            Detail products
                        </Grid>
                    </Grid>
                    <Typography>Another product </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductDetails

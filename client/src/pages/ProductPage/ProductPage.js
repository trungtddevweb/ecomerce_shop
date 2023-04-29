import { Box, Grid, Paper } from '@mui/material'
import Image from 'mui-image'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import { lazy } from 'react'
import useScrollToTop from '~/hooks/useScrollToTop'
import flashSale from '~/assets/imgs/flash-sale.jpg'
import useStyles from '~/assets/styles/useStyles'
const FilterList = lazy(() => import('./FilterList'))

const ProductPage = () => {
    useDocumentTitle('Sản phẩm')
    useScrollToTop()
    const classes = useStyles()

    return (
        <Box display='flex' marginY={5} justifyContent='center'>
            <Box width={1400}>
                <Image src={flashSale} duration={500} alt='Flash sale' height={300} />
                <Grid marginY={2} container spacing={2}>
                    <Grid xs={3} item>
                        <Paper>
                            <FilterList />
                        </Paper>
                    </Grid>
                    <Grid xs={9} item>
                        <Paper elevation={4}>List Product</Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductPage

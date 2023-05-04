import { useState, useEffect, lazy, useRef } from 'react'
import { Box, Grid, Paper } from '@mui/material'
import Image from 'mui-image'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import flashSale from '~/assets/imgs/flash-sale.jpg'
import { getAllProducts } from '~/api/main'
import CardProductItem from '~/components/CardProductItem'
const FilterList = lazy(() => import('./FilterList'))

const ProductPage = () => {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(10)
    const [isFetching, setIsFetching] = useState(false)

    const observer = useRef()
    const lastProductRef = useRef()

    useDocumentTitle('Sản phẩm')
    useScrollToTop()

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             setIsFetching(true)
    //             const res = await getAllProducts()
    //             setProducts(prevProducts => [...prevProducts, res.docs])
    //             setIsFetching(false)
    //             if (observer.current && !isFetching) {
    //                 observer.current.disconnect()
    //             }
    //             observer.current = new IntersectionObserver(entries => {
    //                 if (entries[0].isIntersecting) {
    //                     setPage(prevPage => prevPage + 1)
    //                 }
    //             })

    //             if (lastProductRef.current) {
    //                 observer.current.observe(lastProductRef.current)
    //             }
    //         } catch (error) {
    //             console.error(error)
    //             setIsFetching(false)
    //         }
    //     }
    //     fetchProducts()
    // }, [page, limit, isFetching])

    console.log(products)

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
                    <Grid xs={9} item spacing={2} container>
                        {/* {products?.map((product, index) => (
                            // <Grid item key={index} xs={3}>
                            //     <Paper elevation={6}>
                            //         <CardProductItem data={product} />
                            //     </Paper>
                            // </Grid>
                            // <div key={product._id}>
                            //     {index === products.length - 1 ? (
                            //         <div ref={lastProductRef}>{product.name}</div>
                            //     ) : (
                            //         <div>{product.name}</div>
                            //     )}
                            // </div>
                        ))} */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductPage

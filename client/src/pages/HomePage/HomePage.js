import { Box, Stack } from '@mui/material'
import { useEffect, lazy } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

const ListPostsBlog = lazy(() => import('~/components/ListPostsBlog'))
const Sliders = lazy(() => import('~/components/Slider'))

const HomePage = () => {
    useDocumentTitle('Trang chủ')
    useEffect(() => {
        const fetchPost = async () => {
            try {
                // const res = await getAllProducts()
            } catch (error) {
                console.error(error)
            }
        }
        fetchPost()
    }, [])
    return (
        <Box className="homePage" flexDirection='column'>
            <Sliders />
            <Stack direction='column' className="homePage-container">
                <div>Shipping</div> {/*<---------Viết shipping ở đây---------->*/}
                <div>Product 1</div>
                <div>Product hot</div>
                <div>Banner</div>
                <div>Other product</div>
                <div>New letter</div> {/*<----------Viết newLetters ở đây-------->*/}
                <ListPostsBlog />
            </Stack>
        </Box>
    )
}

export default HomePage

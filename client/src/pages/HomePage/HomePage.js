import { Box, Stack } from '@mui/material'
import { useEffect, lazy } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'

const ListPostsBlog = lazy(() => import('~/components/ListPostsBlog'))
const Sliders = lazy(() => import('~/components/Slider'))
const NewLetters = lazy(() => import('~/components/NewLetters'))
const Onboarding = lazy(() => import('./Onboading'))
const ListProducts = lazy(() => import('~/components/ListProducts'))

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
        <Box>
            <Sliders />
            <Stack direction='column' className='homePage-container'>
                <ListProducts title='Sản phẩm hot nhất' query='' />
                <Onboarding />
                <div>Product 1</div>
                <div>Banner</div>
                <div>Other product</div>
                <NewLetters />
                <ListPostsBlog />
            </Stack>
        </Box>
    )
}

export default HomePage

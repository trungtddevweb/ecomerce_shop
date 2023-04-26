import { Box, Stack } from '@mui/material'
import { lazy } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import NewLastestProduct from './NewLastestProduct'

const ListPostsBlog = lazy(() => import('~/pages/HomePage/ListPostsBlog'))
const Sliders = lazy(() => import('~/components/Slider'))
const NewLetters = lazy(() => import('~/components/NewLetters'))
const Onboarding = lazy(() => import('./Onboading'))
const ListProducts = lazy(() => import('~/pages/HomePage/ListProducts'))

const HomePage = () => {
    useDocumentTitle('Trang chủ')

    return (
        <Box>
            <Sliders />
            <Stack direction='column' className='homePage-container'>
                <ListProducts title='Sản phẩm hot nhất' />
                <Onboarding />
                <NewLastestProduct />
                <div>Banner</div>
                <div>Other product</div>
                <NewLetters />
                <ListPostsBlog />
            </Stack>
        </Box>
    )
}

export default HomePage

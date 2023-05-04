import { Box, Stack } from '@mui/material'
import { lazy } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import NewLastestProduct from './NewLastestProduct'
import Image from 'mui-image'
import bannerShipping from '~/assets/imgs/banner-shopping.jpg'
import CreateProducts from '~/components/CreateAProduct/CreateAProduct'
// import CreateAProducts from '~/components/CreateProducts/CreateAProductsts'
import useScrollToTop from '~/hooks/useScrollToTop'

const ListPostsBlog = lazy(() => import('~/pages/HomePage/ListPostsBlog'))
const Sliders = lazy(() => import('~/components/Slider'))
const NewLetters = lazy(() => import('~/components/NewLetters'))
const Onboarding = lazy(() => import('./Onboading'))
const ListProducts = lazy(() => import('~/pages/HomePage/ListProducts'))

const HomePage = () => {
    useDocumentTitle('Trang chủ')
    useScrollToTop()

    return (
        <Box>
            <Sliders />
            <Stack direction='column' className='homePage-container'>
                <ListProducts title='Sản phẩm hot nhất' />
                <Onboarding />
                <NewLastestProduct />
                <Image width='100%' src={bannerShipping} alt='Shipping' />
                <NewLetters />
                <ListPostsBlog />
                <CreateProducts />
            </Stack>
        </Box>
    )
}

export default HomePage

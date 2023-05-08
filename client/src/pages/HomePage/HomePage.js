import { Box, Stack } from '@mui/material'
import { lazy } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import NewLastestProduct from './NewLastestProduct'
import Image from 'mui-image'
import bannerShipping from '~/assets/imgs/banner-shopping.jpg'

import useScrollToTop from '~/hooks/useScrollToTop'

const ListPostsBlog = lazy(() => import('./ListPostsBlog'))
const Sliders = lazy(() => import('~/components/Slider'))
const NewLetters = lazy(() => import('~/components/NewLetters'))
const Onboarding = lazy(() => import('./Onboading'))
const ListProducts = lazy(() => import('./ListProducts'))

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
                <Image width='100%' height='50%' src={bannerShipping} alt='Shipping' />
                <ListPostsBlog />
                <NewLetters />
            </Stack>
        </Box>
    )
}

export default HomePage

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import NewLastestProduct from './NewLastestProduct'
import Image from 'mui-image'
import bannerShipping from '~/assets/imgs/banner-shopping.jpg'
import useScrollToTop from '~/hooks/useScrollToTop'
import ListPostsBlog from './ListPostsBlog/ListPostsBlog'
import Sliders from '~/components/Slider'
import NewLetters from '~/components/NewLetters/NewLetters'
import Onboarding from './Onboading/Onboarding'
import ListProducts from './ListProducts/ListProducts'

const HomePage = () => {
    useDocumentTitle('Trang chủ')
    useScrollToTop()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box>
            {!isMatch && <Sliders />}
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

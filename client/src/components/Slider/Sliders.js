import Slider from 'react-slick'
import { Box } from '@mui/material'
import Image from 'mui-image'
import { imagesSlider } from 'src/utils/const'

const Sliders = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false
                }
            }
        ]
    }

    return (
        <Box className='slide-container'>
            <Slider {...settings}>
                {imagesSlider.map(slider => (
                    <Image duration={500} key={slider.src} src={slider.src} alt={slider.alt} />
                ))}
            </Slider>
        </Box>
    )
}

export default Sliders

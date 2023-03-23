import Slider from 'react-slick'
import { Grid } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner1 from '~/assets/imgs/banner1.png'
import banner2 from '~/assets/imgs/banner2.jpg'
import banner3 from '~/assets/imgs/banner3.png'
import Image from '../Image/Image'

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
        draggable: false,
        fade: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    draggable: true
                }
            }
        ]
    }
    const imagesSlider = [
        { src: banner1, alt: 'Slider 1' },
        { src: banner2, alt: 'Slider 2' },
        { src: banner3, alt: 'Slider 3' },
    ]
    return (
        <Grid className='slide-container'>
            <Slider {...settings}>
                {imagesSlider.map(slider => (
                    <Image key={slider.src} src={slider.src} alt={slider.alt} />
                ))}
            </Slider>
        </Grid>
    )
}

export default Sliders

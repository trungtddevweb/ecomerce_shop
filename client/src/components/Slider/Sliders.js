import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner1 from '~/assets/imgs/banner1.png'
import banner2 from '~/assets/imgs/banner2.jpg'
import banner3 from '~/assets/imgs/banner3.png'
import '~/assets/scss/sliders.scss'

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
    return (
        <div className='slide-container'>
            <Slider {...settings}>
                <img src={banner1} alt='' />
                <img src={banner2} alt='' />
                <img src={banner3} alt='' />
            </Slider>
        </div>
    )
}

export default Sliders

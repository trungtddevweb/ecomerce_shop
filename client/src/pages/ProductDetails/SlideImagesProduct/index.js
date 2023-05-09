import { Box, Grid } from '@mui/material'
import { useState, useRef, useEffect, Fragment } from 'react'
import Slider from 'react-slick'
import Image from 'mui-image'

const SliderImagesProduct = ({ images, isMatch }) => {
    const { productImages } = images

    const [nav, setNav] = useState(null)
    const [subNav, setSubNav] = useState(null)
    const slider1 = useRef(null)
    const slider2 = useRef(null)

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    }

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
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

    useEffect(() => {
        setNav(slider1.current)
        setSubNav(slider2.current)
    }, [slider1, slider2])

    return isMatch ? (
        <Box width='96vw' className='slide-container'>
            <Slider {...settings2}>
                {productImages?.map(slider => (
                    <Box key={slider}>
                        <Image duration={500} width='100%' height={500} src={slider} alt='' />
                    </Box>
                ))}
            </Slider>
        </Box>
    ) : (
        <Fragment>
            <Slider asNavFor={subNav} arrows={false} prevArrow={false} nextArrow={false} fade ref={slider1}>
                {productImages?.map(img => (
                    <Box elevation={6} key={img}>
                        <Image height={500} src={img} alt='' />
                    </Box>
                ))}
            </Slider>
            <Slider asNavFo r={nav} ref={slider2} swipeToSlide={true} focusOnSelect={true} {...settings}>
                {productImages?.map(img => (
                    <Box key={img}>
                        <Image
                            sx={{
                                cursor: 'pointer'
                            }}
                            width={100}
                            height={100}
                            src={img}
                            alt=''
                        />
                    </Box>
                ))}
            </Slider>
        </Fragment>
    )
}

export default SliderImagesProduct

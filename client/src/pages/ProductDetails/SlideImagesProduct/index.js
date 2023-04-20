import { Box, Paper } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import Slider from 'react-slick'
import Image from 'mui-image'

const SliderImagesProduct = ({ images }) => {
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

    useEffect(() => {
        setNav(slider1.current)
        setSubNav(slider2.current)
    }, [slider1, slider2])

    return (
        <>
            <Slider asNavFor={subNav} arrows={false} prevArrow={false} nextArrow={false} fade ref={slider1}>
                {productImages?.map(img => (
                    <Box elevation={6} key={img}>
                        <Image width='100%' height={500} src={img} alt='' />
                    </Box>
                ))}
            </Slider>
            <Slider asNavFor={nav} ref={slider2} swipeToSlide={true} focusOnSelect={true} {...settings}>
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
        </>
    )
}

export default SliderImagesProduct

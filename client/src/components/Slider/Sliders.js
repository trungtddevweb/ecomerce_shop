import { useState } from 'react'
import Slider from 'react-slick'
import { Box, Button, Stack, Typography } from '@mui/material'
import { sliderLists } from 'src/utils/const'
import Image from 'mui-image'
import useStyles from '~/assets/styles/useStyles'
import { Link } from 'react-router-dom'

const Sliders = () => {
    const classes = useStyles()
    const [isHovered, setIsHovered] = useState(false)
    const settings = {
        dots: false,
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

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <Box className='slide-container'>
            <Slider {...settings}>
                {sliderLists?.map((slider, i) => (
                    <Box
                        sx={{
                            position: 'relative'
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        key={i}
                    >
                        <Box>
                            <Image height={700} src={slider.src} alt={slider.title} />
                        </Box>
                        <Stack
                            className={[classes.flexBox, isHovered ? 'fade-in-stack' : 'fade-out-stack']}
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                zIndex: 20,
                                top: '0',
                                backgroundColor: 'rgba(18, 18, 18, 0.8)',
                                visibility: isHovered ? 'visible' : 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography width='70%' color='white' fontWeight={700} fontFamily='revert' variant='h3'>
                                {slider.title}
                            </Typography>
                            <Link to='/products'>
                                <Button
                                    sx={{
                                        width: 'max-content',
                                        fontSize: '32px',
                                        mt: 4
                                    }}
                                    variant='outlined'
                                >
                                    Mua Ngay
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}

export default Sliders

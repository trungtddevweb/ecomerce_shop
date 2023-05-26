import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'
import Image from 'mui-image'
import { getRandomProductsAPI } from '~/api/main'
import SlideImage from '../SlideImage/SlideImage'

const Sliders = () => {
    const [data, setData] = useState([])
    const NUMBER_RANDOM = 5
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRandomProductsAPI(NUMBER_RANDOM)
                setData(response.data)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
    }, [])

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
                {data?.map(slider => (
                    <SlideImage key={slider._id} slider={slider} />
                ))}
            </Slider>
        </Box>
    )
}

export default Sliders

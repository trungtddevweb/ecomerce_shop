import { Box, List, ListItemButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'mui-image'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useStyles from '~/assets/styles/useStyles'

const RandomProduct = ({ nameValue }) => {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const classes = useStyles()
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsFetching(true)
                const res = await axios.get('http://localhost:5000/api/products/random')
                setData(res.data)
                setIsFetching(false)
            } catch (error) {
                console.error(error)
                setIsFetching(false)
            }
        }
        fetch()
    }, [nameValue])

    if (isFetching) {
        return (
            <Box>
                <SkeletonFallback height='70px' />
                <SkeletonFallback width='100%' />
                <SkeletonFallback width='80%' />
            </Box>
        )
    }

    return (
        <List>
            {data?.map(item => (
                <Link className={classes.hoverItem} to={`/products/${item._id}`}>
                    <Paper
                        sx={{
                            marginBottom: '12px'
                        }}
                        elevation={2}
                    >
                        <ListItemButton key={item._id}>
                            <Stack direction='row' spacing={1}>
                                <Box>
                                    <Image
                                        width='100px'
                                        height='100px'
                                        alt={item.name}
                                        src={item.productImages?.[0]}
                                        duration={500}
                                    />
                                </Box>
                                <Stack spacing={1}>
                                    <Typography variant='body2' fontWeight={600}>
                                        {item.name}
                                    </Typography>
                                    <Typography color='error'>{item.price.toLocaleString('vi-VN')} VNĐ</Typography>
                                </Stack>
                            </Stack>
                        </ListItemButton>
                    </Paper>
                </Link>
            ))}
        </List>
    )
}

export default RandomProduct

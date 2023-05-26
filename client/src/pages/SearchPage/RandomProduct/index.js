import { Box, List, ListItemButton, Paper, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton'
import { getRandomProductsAPI } from '~/api/main'
import useStyles from '~/assets/styles/useStyles'

const RandomProduct = ({ nameValue, isMatch }) => {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const classes = useStyles()
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsFetching(true)
                const res = await getRandomProductsAPI(10)
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
                <Link key={item._id} className={classes.hoverItem} to={`/products/${item._id}`}>
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
                                        width={isMatch ? 80 : 100}
                                        height={isMatch ? 80 : 100}
                                        alt={item.name}
                                        src={item.productImages?.[0]}
                                        duration={500}
                                    />
                                </Box>
                                <Stack spacing={1}>
                                    <Typography
                                        className={isMatch ? classes.title : ''}
                                        variant='body2'
                                        fontWeight={600}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography color='error'>{item.price.toLocaleString('vi-VN')} đ</Typography>
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

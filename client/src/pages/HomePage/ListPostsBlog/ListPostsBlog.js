import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import { getAllBlogs } from '~/api/main'
import useStyles from '~/assets/styles/useStyles'

const ListPostsBlog = () => {
    const [listBlogs, setListBlogs] = useState([])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true)
                const response = await getAllBlogs()
                setIsLoading(false)
                setListBlogs(response.docs)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchPosts()
    }, [dispatch])

    return (
        <Stack width={1400} margin='auto'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='h6' color='primary.main'>
                    Bài viết nổi bật
                </Typography>
                <Typography variant='subtitle2' className={classes.hoverItem} component={Link} to='/blogs' color='blue'>
                    Xem thêm {'>>'}
                </Typography>
            </Stack>
            <Grid container marginBottom={5}>
                {(isLoading ? Array.from(new Array(4)) : listBlogs).map((item, index) => (
                    <Grid item key={item?._id || index} xs={3}>
                        <Card sx={{ maxWidth: 340 }}>
                            <CardActionArea>
                                {item ? (
                                    <CardMedia component='img' height='200' image={item?.picture} />
                                ) : (
                                    <SkeletonFallback key={index} sx={{ height: 200 }} variant='rectangular' />
                                )}
                                <CardContent>
                                    {item ? (
                                        <>
                                            <Typography gutterBottom variant='h6' minHeight={64} component='p'>
                                                {item?.title}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                component='div'
                                                className={classes.limitLines}
                                            >
                                                {item?.desc}
                                            </Typography>
                                            <Typography
                                                marginTop={2}
                                                color='text.secondary'
                                                component='p'
                                                textAlign='right'
                                                fontSize={14}
                                            >
                                                Ngày đăng:
                                                <Typography fontSize={14} component='span'>
                                                    {' '}
                                                    {item?.createdAt.split('T')[0]}
                                                </Typography>
                                            </Typography>
                                        </>
                                    ) : (
                                        <Box>
                                            <SkeletonFallback />
                                            <SkeletonFallback height={100} />
                                            <SkeletonFallback width='80%' />
                                        </Box>
                                    )}
                                </CardContent>
                            </CardActionArea>
                            <Divider />
                            <CardActions>
                                <Button component={Link} to={`/blogs/${item?._id}`} size='small' color='primary'>
                                    Đọc
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}

export default ListPostsBlog

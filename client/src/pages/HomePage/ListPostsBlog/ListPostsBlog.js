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
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import { optionsQuery } from 'src/utils/const'
import { formatDate } from 'src/utils/format'
import routes from 'src/utils/routes'
import { getAllBlogs } from '~/api/main'
import useStyles from '~/assets/styles/useStyles'

const ListPostsBlog = () => {
    const [listBlogs, setListBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllBlogs(optionsQuery.limit - 1, optionsQuery.page)
                setIsLoading(false)
                setListBlogs(response.docs)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <Box
            p={2}
            marginY={isMatch ? 2 : 6}
            sx={{
                display: 'flex',
                alignItems: {
                    md: 'center'
                },
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    maxWidth: {
                        xl: 1400,
                        sm: 'auto'
                    }
                }}
            >
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6' color='primary.main'>
                        Bài viết nổi bật
                    </Typography>
                    {!isMatch && (
                        <Typography
                            variant='subtitle2'
                            className={classes.hoverItem}
                            component={Link}
                            to='/blogs'
                            color='blue'
                        >
                            Xem thêm {'>>'}
                        </Typography>
                    )}
                </Stack>
                <Grid container marginBottom={5} spacing={2}>
                    {(isLoading ? Array.from(new Array(4)) : listBlogs).map((item, index) => (
                        <Grid item key={item?._id || index} xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    maxWidth: {
                                        md: 340
                                    }
                                }}
                            >
                                <CardActionArea>
                                    {item ? (
                                        <CardMedia component='img' height='200' image={item?.picture?.[0]} />
                                    ) : (
                                        <SkeletonFallback
                                            key={index}
                                            sx={{
                                                width: {
                                                    md: 240,
                                                    lg: 300,
                                                    xl: 350
                                                },
                                                height: 200
                                            }}
                                            variant='rectangular'
                                        />
                                    )}
                                    <CardContent>
                                        {item ? (
                                            <Link className={classes.hoverItem} to={`/blogs/${item._id}`}>
                                                <Typography
                                                    className={classes.title}
                                                    gutterBottom
                                                    variant='h6'
                                                    minHeight={64}
                                                    component='p'
                                                >
                                                    {item?.title}
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    color='text.secondary'
                                                    sx={{ minHeight: '80px' }}
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
                                                    {formatDate(item.createdAt)}
                                                </Typography>
                                            </Link>
                                        ) : (
                                            <Box>
                                                <SkeletonFallback />
                                                <SkeletonFallback height={100} />
                                                <SkeletonFallback width='80%' />
                                            </Box>
                                        )}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    {isMatch && (
                        <Grid item xs={12} mt={2} className={classes.flexBox}>
                            <Link to={routes.blog.path}>
                                <Button size='small'>Xem thêm</Button>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default ListPostsBlog

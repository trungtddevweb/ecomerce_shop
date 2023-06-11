import { useParams, Link } from 'react-router-dom'
import {
    Box,
    Breadcrumbs,
    CircularProgress,
    Grid,
    Link as LinkMUI,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import Image from 'mui-image'
import { useEffect, useState, lazy } from 'react'
import { getABlogPostAPI } from '~/api/main'
import { CalendarMonth, Person3 } from '@mui/icons-material'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
const RecentPosts = lazy(() => import('./RecentBlogs'))

const BlogDetailPage = () => {
    dayjs.extend(relativeTime)
    const [post, setPost] = useState({})
    useDocumentTitle(post?.title)
    useScrollToTop()
    const [isLoading, setIsLoading] = useState(true)
    const { blogId } = useParams()
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true)
                const post = await getABlogPostAPI(blogId)
                setPost(post)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchPost()
    }, [blogId])
    console.log(post)

    return (
        <Box p={1} display='flex' minHeight='70vh' justifyContent={{ xl: 'center' }} marginY={5}>
            <Box
                sx={{
                    width: {
                        xl: 1400,
                        xs: '100vw'
                    }
                }}
            >
                <Box role='presentation'>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/'
                        >
                            Trang chủ
                        </LinkMUI>
                        <LinkMUI
                            className={classes.hoverItem}
                            component={Link}
                            underline='hover'
                            color='inherit'
                            to='/blogs'
                        >
                            Tất cả bài viết
                        </LinkMUI>
                        <Typography color='primary'>Chi tiết bài viết</Typography>
                    </Breadcrumbs>
                    <Grid paddingY={2} container spacing={2}>
                        <Grid item sm={8} md={7} xs={12}>
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Paper elevation={6}>
                                    <Image src={post?.picture?.[0] || ''} alt={post.name} />
                                    <Stack spacing={2} padding={2}>
                                        <Stack direction='row' justifyContent='space-between'>
                                            <Typography
                                                color='gray'
                                                variant='body2'
                                                className={classes.flexBox}
                                                gap={1}
                                                component='div'
                                            >
                                                <CalendarMonth fontSize='small' />
                                                {dayjs(post.createdAt).fromNow()}
                                            </Typography>
                                            <Typography
                                                gap={1}
                                                component='div'
                                                variant='body2'
                                                color='gray'
                                                className={classes.flexBox}
                                            >
                                                <Person3 fontSize='small' />
                                                {post.author}
                                            </Typography>
                                        </Stack>
                                        <Typography variant='h5' color='primary' fontWeight={500}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant='body1' color='GrayText' fontWeight={500}>
                                            {post.desc}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            )}
                        </Grid>
                        <Grid item sm={4} md={5} xs={12}>
                            <Typography variant='h6' marginBottom={2} fontWeight={600}>
                                Những bài viết liên quan
                            </Typography>
                            <RecentPosts isMatch={isMatch} blogId={blogId} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default BlogDetailPage

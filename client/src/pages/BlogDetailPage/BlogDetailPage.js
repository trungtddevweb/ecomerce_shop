import { useParams, Link } from 'react-router-dom'
import { Box, Breadcrumbs, Grid, Link as LinkMUI, Paper, Typography } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import Image from 'mui-image'
import { useEffect, useState } from 'react'
import { getABlogPostAPI } from '~/api/main'
import SpinnerAnimation from '~/components/SpinnerAnimation'

const BlogDetailPage = () => {
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { blogId } = useParams()
    const classes = useStyles()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true)
                const post = await getABlogPostAPI(blogId)
                console.log(post)
                setPost(post)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchPost()
    }, [blogId])

    if (isLoading) return <SpinnerAnimation />

    return (
        <Box display='flex' marginY={5} justifyContent='center'>
            <Box width={1400}>
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
                    <Grid paddingY={2} container xs={12} spacing={2}>
                        <Grid item xs={7}>
                            <Paper elevation={6}>
                                <Image alt={post?.img} src='' />
                            </Paper>
                        </Grid>
                        <Grid item xs={5}>
                            Recents blog
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default BlogDetailPage

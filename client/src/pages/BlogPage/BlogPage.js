import { Info } from '@mui/icons-material'
import {
    Box,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    TextField,
    Tooltip,
    Typography
} from '@mui/material'
import Image from 'mui-image'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBlogs } from '~/api/main'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'

const BlogPage = () => {
    useDocumentTitle('Bài viết ')
    useScrollToTop()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await getAllBlogs()
                setBlogs(blogs.docs)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, [])

    return (
        <Box marginY={5} minHeight='100vh' display='flex' justifyContent='center'>
            <Grid container width={1400} spacing={3}>
                <Grid item xs={8}>
                    <ImageList variant='masonry' gap={8}>
                        <ImageListItem key='Subheader' cols={2}>
                            <Typography variant='h6' color='primary'>
                                Tổng hợp các blogs
                            </Typography>
                        </ImageListItem>
                        {blogs.map(blog => (
                            <ImageListItem key={blog.picture}>
                                <Link to={`/blogs/${blog._id}`}>
                                    <Image
                                        duration={500}
                                        src={blog.picture}
                                        srcSet={blog.img}
                                        alt={blog.title}
                                        loading='lazy'
                                    />
                                    <ImageListItemBar
                                        title={blog.title}
                                        subtitle={blog.author}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${blog.title}`}
                                            >
                                                <Tooltip title='Xem thêm'>
                                                    <Info />
                                                </Tooltip>
                                            </IconButton>
                                        }
                                    />
                                </Link>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid item xs={4}>
                    <Typography marginBottom={2}>Tìm kiếm bài viết</Typography>
                    <TextField fullWidth variant='standard' label='Nhập tên bài viết...' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogPage

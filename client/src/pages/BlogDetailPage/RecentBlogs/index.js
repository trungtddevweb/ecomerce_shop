import { useEffect, useState } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { getAllBlogs } from '~/api/main'
import Image from 'mui-image'
import { Link } from 'react-router-dom'

const RecentPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getAllBlogs()
                setPosts(posts.docs)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <Box position='sticky' top={100} width='70%' display='flex' flexDirection='column' gap={2}>
            {posts.map(post => (
                <Paper key={post._id} elevation={4}>
                    <Stack padding={2} spacing={2} direction='row'>
                        <Box>
                            <Image width={100} height={100} src={post.picture} />
                        </Box>
                        <Link to={`/blogs/${post._id}`}>
                            <Stack>
                                <Typography color='primary' fontWeight={600}>
                                    {post.title}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='Graytext'
                                    sx={{
                                        height: '60px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {post.desc}
                                </Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </Paper>
            ))}
        </Box>
    )
}

export default RecentPosts

import { Box, Paper, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useFetchData from '~/hooks/useFetchData'

const RecentPosts = ({ blogId }) => {
    const { data, isLoading } = useFetchData(`/blogs/`)

    if (isLoading)
        return (
            <Box width='60%'>
                <SkeletonFallback height={100} />
                <SkeletonFallback />
                <SkeletonFallback width='80%' />
            </Box>
        )

    const processedResult = data?.filter(item => !(item._id && item._id === blogId))

    return (
        <Box position='sticky' top={100} width='70%' display='flex' flexDirection='column' gap={2}>
            {processedResult?.map(post => (
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

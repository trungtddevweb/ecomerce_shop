import { Box, Paper, Stack, Typography } from '@mui/material'
import DOMPurify from 'dompurify'
import Image from 'mui-image'
import { Link } from 'react-router-dom'
import SkeletonFallback from 'src/fallback/Skeleton/SkeletonFallback'
import useStyles from '~/assets/styles/useStyles'
import useFetchData from '~/hooks/useFetchData'

const RecentPosts = ({ blogId }) => {
    const { data, isLoading } = useFetchData(`/blogs/`)
    const classes = useStyles()

    if (isLoading)
        return (
            <Box width={{ xs: '100', xl: '60%' }}>
                <SkeletonFallback height={100} />
                <SkeletonFallback />
                <SkeletonFallback width='80%' />
            </Box>
        )

    const processedResult = data?.filter(item => !(item._id && item._id === blogId))

    return (
        <Box width={{ xs: '100%', xl: '60%' }} display='flex' flexDirection='column' gap={2}>
            {processedResult?.map(post => (
                <Paper key={post._id} elevation={4}>
                    <Stack padding={2} spacing={2} direction='row'>
                        <Box>
                            <Image width={100} height={100} src={post.picture?.[0]} />
                        </Box>
                        <Link to={`/blogs/${post._id}`}>
                            <Stack>
                                <Typography color='primary' className={classes.title} fontWeight={600}>
                                    {post.title}
                                </Typography>
                                {/* <Typography
                                    component='div'
                                    variant='body2'
                                    color='Graytext'
                                    display={{ sm: 'none', md: 'block' }}
                                    sx={{
                                        height: '60px',
                                        overflow: 'hidden'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}
                                ></Typography> */}
                            </Stack>
                        </Link>
                    </Stack>
                </Paper>
            ))}
        </Box>
    )
}

export default RecentPosts

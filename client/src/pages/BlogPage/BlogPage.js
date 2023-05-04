import { Info, Search } from '@mui/icons-material'
import {
    Box,
    CircularProgress,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    InputAdornment,
    InputBase,
    Paper,
    Stack,
    Tooltip,
    Typography
} from '@mui/material'
import Image from 'mui-image'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useStyles from '~/assets/styles/useStyles'
import useDebounce from '~/hooks/useDebounce'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useFetchData from '~/hooks/useFetchData'
import useScrollToTop from '~/hooks/useScrollToTop'

const BlogPage = () => {
    useDocumentTitle('Bài viết ')
    useScrollToTop()
    const classes = useStyles()
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)
    const { data, isLoading } = useFetchData(`/blogs/search?title=${debouncedQuery}`)

    return (
        <Box marginY={5} minHeight='100vh' display='flex' justifyContent='center'>
            <Grid container width={1400} spacing={3}>
                <Grid item xs={8}>
                    <Stack display={query === '' ? 'none' : 'flex'} direction='row' spacing={2} marginBottom={2}>
                        <Typography variant='h6' color='primary'>
                            Kết quả tìm kiếm cho:{' '}
                        </Typography>
                        <Typography variant='h6' color='secondary'>
                            "{query}"
                        </Typography>
                    </Stack>
                    {isLoading ? (
                        <Box className={classes.flexBox} height={500}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <ImageList variant='masonry' gap={8}>
                            {data?.length === 0 && (
                                <Typography>
                                    Không có kết quả tìm kiếm phù hợp cho từ khóa bạn tìm kiếm. Vui lòng thử lại!
                                </Typography>
                            )}
                            {data?.map(blog => (
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
                    )}
                </Grid>
                <Grid item xs={4}>
                    <Typography marginBottom={2}>Tìm kiếm bài viết</Typography>
                    <Paper>
                        <InputBase
                            type='search'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoComplete='off'
                            placeholder='Nhập từ khóa...'
                            fullWidth
                            padding='12px'
                            sx={{
                                padding: '12px',
                                backgroundColor: '#f2f2f2'
                            }}
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>
                            }
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogPage

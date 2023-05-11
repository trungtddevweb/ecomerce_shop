import { Info, Search } from '@mui/icons-material'
import {
    Box,
    Button,
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
    Typography,
    useMediaQuery,
    useTheme
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
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const [limited, setLimited] = useState(10)
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)

    const { data, isLoading, totalDocs } = useFetchData(`/blogs/search?title=${debouncedQuery}&limit=${limited}`)
    const hasMore = limited < totalDocs

    const loadMore = () => {
        setLimited(limited + 10)
    }

    return (
        <Box marginY={5} p={1} minHeight={{ xs: '50vh', xl: '70vh' }} display='flex' justifyContent='center'>
            <Grid
                container
                sx={{
                    width: {
                        xl: 1400
                    }
                }}
                spacing={3}
                direction={'row-reverse'}
            >
                <Grid item xs={12} sm={5} md={4} xl={4}>
                    <Typography marginBottom={2}>Tìm kiếm bài viết</Typography>
                    <Paper>
                        <InputBase
                            size={isMatch ? 'small' : 'medium'}
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
                <Grid item xs={12} sm={7} md={8} xl={8}>
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
                        <>
                            {data.length === 0 && (
                                <Typography>
                                    Không có kết quả tìm kiếm phù hợp cho từ khóa bạn tìm kiếm. Vui lòng thử lại!
                                </Typography>
                            )}
                            <ImageList variant='masonry' gap={8} cols={isMatch ? 2 : 3}>
                                {data.map(blog => (
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
                        </>
                    )}
                    {hasMore && (
                        <Grid className={classes.flexBox} md={12} sx={12}>
                            <Button onClick={loadMore}>Xem thêm</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogPage

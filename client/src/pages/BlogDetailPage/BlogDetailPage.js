import { useParams, Link } from 'react-router-dom'
import { Box, Breadcrumbs, Link as LinkMUI, Typography } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'

const BlogDetailPage = () => {
    const { blogId } = useParams()
    const classes = useStyles()

    function handleClick(event) {
        event.preventDefault()
        console.info('You clicked a breadcrumb.')
    }
    return (
        <Box className='blogDetails-page' display='flex' justifyContent='center'>
            <Box className='blogDetails-wrapper'>
                <Box role='presentation' onClick={handleClick}>
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
                    <Typography variant='body1'>{blogId}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default BlogDetailPage

import { Home } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import { Link, useRouteError } from 'react-router-dom'
import useStyles from '~/assets/styles/useStyles'

const ErrorPage = () => {
    const error = useRouteError()
    const classes = useStyles()

    return (
        <Box className={classes.flexBox} height='100vh'>
            <Box textAlign='center'>
                <Typography variant='h2' fontWeight={600}>
                    404
                </Typography>
                <Typography component='p' className='fs-3'>
                    {' '}
                    <Typography component='span' variant='h4' className='text-danger'>
                        Có lỗi!
                    </Typography>{' '}
                    Trang bạn tìm kiếm hiện không tồn tại
                </Typography>
                <Typography component='p' className='lead'>
                    Có vẻ như trang bạn tìm kiếm đang trong quá trình nâng cấp hoặc đã bị xóa, vui lòng quay lại trang
                    trước!
                </Typography>
                <Typography component='p'>
                    <Typography margin={2} fontStyle='italic'>
                        {error.statusText || error.message}
                    </Typography>
                </Typography>
                <Button startIcon={<Home />} aria-label='go-home-button' component={Link} to='/' variant='contained'>
                    Go Home
                </Button>
            </Box>
        </Box>
    )
}

export default ErrorPage

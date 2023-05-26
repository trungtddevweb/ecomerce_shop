import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Box,
    Stack,
    Divider,
    TextField,
    InputAdornment
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { updatedBlogAPI } from '~/api/main'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import useStyles from '~/assets/styles/useStyles'
import { formatDate } from 'src/utils/format'
import Image from 'mui-image'
import { Person } from '@mui/icons-material'

const DialogBlog = ({ open, handleClose, data, type, setIsDeleting }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)
    const classes = useStyles()
    const { _id, title, desc, author, createdAt, picture } = data

    const defaultValues = {
        title,
        desc,
        author
    }
    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm({
        defaultValues
    })

    const handleFormSubmit = async valueForm => {
        const payload = {
            ...valueForm,
            postId: _id
        }
        try {
            setIsDeleting(true)
            const res = await updatedBlogAPI(payload, token)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Cập nhập thành công!' }))
                setIsDeleting(false)
                handleClose()
            }
        } catch (error) {
            setIsDeleting(true)
            console.error(error)
            dispatch(showToast({ type: 'error', message: error.message }))
        }
    }

    return type === 'view' ? (
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Thông tin bài viết</DialogTitle>
            <Divider component='div' variant='fullWidth' />
            <DialogContent>
                <Stack spacing={1} width={800}>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Mã bài viết:{' '}
                        </Typography>
                        <Typography fontWeight={600} color='error'>
                            {_id}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Hình ảnh:{' '}
                        </Typography>
                        <Image src={picture} alt='' duration={0} width={500} />
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Tiêu đề:{' '}
                        </Typography>
                        <Typography fontWeight={600}>{title}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Nội dung:{' '}
                        </Typography>
                        <Typography className={classes.limitLines} paragraph variant='subtitle1'>
                            {desc}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Tác giả:{' '}
                        </Typography>
                        <Typography className={classes.limitLines} paragraph variant='subtitle1'>
                            {author}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Ngày đăng:{' '}
                        </Typography>
                        <Typography className={classes.limitLines} paragraph variant='subtitle1'>
                            {formatDate(createdAt)}
                        </Typography>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    ) : (
        <Dialog open={open} maxWidth={false} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Chỉnh sửa bài viết</DialogTitle>
            <Divider component='div' variant='fullWidth' />
            <DialogContent>
                <Box component='form'>
                    <Grid width={800} container spacing={2} mt={1}>
                        <Grid item xs={12} spacing={2}>
                            <Controller
                                control={control}
                                name='title'
                                render={({ field }) => <TextField {...field} fullWidth label='Tiêu đề' />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name='desc'
                                render={({ field }) => (
                                    <TextField {...field} multiline rows={4} fullWidth label='Miêu tả' />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} spacing={2}>
                            <Controller
                                control={control}
                                name='author'
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label='Tác giả'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Person />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button disabled={!isDirty} onClick={handleSubmit(handleFormSubmit)} variant='contained'>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBlog

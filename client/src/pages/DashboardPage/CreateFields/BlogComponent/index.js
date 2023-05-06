import { Box, Grid, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { createBlogAPI } from '~/api/main'
import { showToast } from 'src/redux/slice/toastSlice'
const BlogComponent = () => {
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onBlog = async data => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('author', data.author)
        formData.append('picture', data.picture[0])
        try {
            const res = await createBlogAPI(formData, token)
            if (res.status === 201) {
                dispatch(showToast({ type: 'success', message: 'Tạo mới bài viết thành công!' }))
            }
            console.log(data)
        } catch (err) {
            console.log(err)
            dispatch(showToast({ type: 'error', message: 'Tạo mới bài viết thất bại!' }))
        }
    }
    return (
        <Box component='form' onSubmit={handleSubmit(onBlog)}>
            <Grid container spacing={1}>
                <Grid xs={12} item>
                    <TextField
                        type='text'
                        label='Tiêu đề'
                        variant='outlined'
                        fullWidth
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p>Tiêu đề là bắt buộc</p>}
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        type='text'
                        label='Mô tả bài viết'
                        multiline
                        rows={4}
                        variant='outlined'
                        fullWidth
                        {...register('desc', { required: true })}
                    />
                    {errors.desc && <p>Mô tả là bắt buộc</p>}
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        type='text'
                        label='Tác giả'
                        variant='outlined'
                        fullWidth
                        {...register('author')}
                        defaultValue={'Ẩn danh'}
                    />
                </Grid>
                <Grid xs={12} item>
                    <TextField type='file' variant='outlined' fullWidth {...register('picture')} />
                </Grid>
                <Grid xs={12} item>
                    <Button type='submit' variant='contained' fullWidth>
                        Tạo blog
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogComponent

import { useState } from 'react'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { createBlogAPI } from '~/api/main'
import { showToast } from 'src/redux/slice/toastSlice'
import ErrorMessages from '~/components/ErrorMessages'
import { LoadingButton } from '@mui/lab'

const BlogComponent = ({ isMatch }) => {
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onBlog = async data => {
        const formData = new FormData()
        formData.set('title', data.title)
        formData.set('desc', data.desc)
        formData.set('author', data.author)
        formData.set('picture', data.picture[0])
        try {
            setIsLoading(true)
            const res = await createBlogAPI(formData, token)
            if (res.status === 201) {
                dispatch(showToast({ type: 'success', message: 'Tạo mới bài viết thành công!' }))
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
            dispatch(showToast({ type: 'error', message: 'Tạo mới bài viết thất bại!' }))
            setIsLoading(false)
        }
    }
    return (
        <Box component='form' onSubmit={handleSubmit(onBlog)}>
            <Grid container spacing={2}>
                <Grid xs={12} item>
                    <TextField
                        size={isMatch ? 'small' : 'medium'}
                        type='text'
                        label='Tiêu đề'
                        variant='outlined'
                        fullWidth
                        {...register('title', { required: true })}
                    />
                    <ErrorMessages errors={errors} fieldName='title' />
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        size={isMatch ? 'small' : 'medium'}
                        type='text'
                        label='Mô tả bài viết'
                        multiline
                        rows={4}
                        variant='outlined'
                        fullWidth
                        {...register('desc', { required: true })}
                    />
                    <ErrorMessages errors={errors} fieldName='desc' />
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        size={isMatch ? 'small' : 'medium'}
                        type='text'
                        label='Tác giả'
                        variant='outlined'
                        fullWidth
                        {...register('author')}
                        defaultValue={'Ẩn danh'}
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography component='input' type='file' variant='outlined' {...register('picture')} />
                </Grid>
                <Grid xs={12} item>
                    <LoadingButton
                        loading={isLoading}
                        fullWidth={isMatch}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        Tạo Mới
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogComponent

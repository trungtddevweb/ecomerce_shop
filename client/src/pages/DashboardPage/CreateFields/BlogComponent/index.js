import { useState } from 'react'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { createBlogAPI } from '~/api/main'
import { useSelector, useDispatch } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import ErrorMessages from '~/components/ErrorMessages'
import { LoadingButton } from '@mui/lab'
import ReactQuill from 'react-quill'

const BlogComponent = ({ isMatch }) => {
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(state => state.auth.user?.token)
    const dispatch = useDispatch()
    const [files, setFiles] = useState([])

    const handleFileUpload = event => {
        const fileList = event.target.files
        const fileArray = Array.from(fileList)
        setFiles(fileArray)
    }
    const handleEditorChange = value => {
        setValue('desc', value)
    }

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()
    const onBlog = async data => {
        const formData = new FormData()
        formData.set('title', data.title)
        formData.set('desc', data.desc)
        formData.set('author', data.author)
        formData.set('picture', data.picture[0])

        for (let i = 0; i < files.length && i < 5; i++) {
            formData.append('picture', files[i])
        }

        try {
            setIsLoading(true)
            const res = await createBlogAPI(formData, token)
            if (res.status === 201) {
                dispatch(showToast({ type: 'success', message: 'Tạo mới bài viết thành công!' }))
                setIsLoading(false)
                reset()
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
                        autoFocus
                        size={isMatch ? 'small' : 'medium'}
                        type='text'
                        label='Tiêu đề'
                        variant='outlined'
                        fullWidth
                        {...register('title', { required: true })}
                    />
                    <ErrorMessages errors={errors} fieldName='title' />
                </Grid>
                <Grid xs={12} item height={isMatch ? 300 : 250}>
                    {/* <TextField
                        size={isMatch ? 'small' : 'medium'}
                        type='text'
                        label='Mô tả bài viết'
                        multiline
                        rows={4}
                        variant='outlined'
                        fullWidth
                        {...register('desc', { required: true })}
                    />
                    <ErrorMessages errors={errors} fieldName='desc' /> */}
                    <ReactQuill
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline', 'strike'],
                                ['link', 'blockquote', 'code-block', 'image'],
                                [{ header: 1 }, { header: 2 }],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                [{ script: 'sub' }, { script: 'super' }],
                                [{ indent: '-1' }, { indent: '+1' }],
                                [{ direction: 'rtl' }],
                                [{ size: ['small', false, 'large', 'huge'] }],
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ color: [] }, { background: [] }],
                                [{ font: [] }],
                                [{ align: [] }],
                                ['clean']
                            ]
                        }}
                        className='editor-container'
                        theme='snow'
                        onChange={handleEditorChange}
                    />
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
                    <Typography
                        component='input'
                        type='file'
                        multiple
                        variant='outlined'
                        {...register('picture', {
                            required: true,
                            onChange: e => handleFileUpload(e)
                        })}
                    />
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

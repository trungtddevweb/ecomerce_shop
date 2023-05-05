import { Box, Grid, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
const BlogComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onBlog = data => console.log(data)
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

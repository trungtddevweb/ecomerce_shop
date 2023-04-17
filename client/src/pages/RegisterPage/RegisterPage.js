import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Button, FormGroup, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material'
import { registerAPI } from '~/api/main'
import { Link, useNavigate } from 'react-router-dom'
import CustomLoading from '~/components/CustomLoading'
import routes from 'src/utils/routes'
import { Add } from '@mui/icons-material'
import images from '~/assets/imgs'
import Image from '~/components/Image/Image'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { LoadingButton } from '@mui/lab'

const registerData = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null])
})

const RegisterPage = () => {
    useDocumentTitle('Đăng kí')

    const dispatch = useDispatch()
    const [previewImg, setPreviewImg] = useState(null)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(registerData) })

    const onSubmitRegiser = async data => {
        const formData = new FormData()
        formData.append('picture', data.picture[0])
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirmPassword', data.confirmPassword)
        setLoading(true)
        try {
            await registerAPI(formData)
            setLoading(false)
            dispatch(showToast({ type: 'success', message: 'Đăng ký thành công!' }))
            navigate('/login')
        } catch (err) {
            setLoading(false)
            dispatch(showToast({ type: 'error', message: 'Đăng ký thất bại!' }))
            setError(err.response.data.message)
        }
    }

    return (
        <Grid container className='register-page'>
            <Grid item className='form-container d-flex justify-content-center align-items-center'>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmitRegiser)}
                    className='shadow py-5 px-4 rounded form-wrap'
                >
                    {/* <div className='mb-3 img-wrap'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div> */}
                    <Typography variant='h5' className='mb-3 text-center'>
                        Đăng Kí
                    </Typography>
                    <Stack className='choose-image my-3 m-auto'>
                        <FormGroup className='d-flex align-items-center justify-content-center'>
                            <Image alt='' src={previewImg || images.registerLogo} className='register-profile-pic' />
                            <TextField
                                type='file'
                                id='image-upload'
                                hidden
                                accept='image/png, image/jpeg'
                                {...register('picture', {
                                    required: true,
                                    onChange: e => {
                                        setPreviewImg(URL.createObjectURL(e.target.files[0]))
                                    }
                                })}
                            />
                        </FormGroup>
                        <InputLabel htmlFor='image-upload' className='image-upload-label bg-primary'>
                            <Add className='upload-btn' />
                        </InputLabel>
                    </Stack>
                    <Typography variant='inherit' className='text-danger mb-2'>
                        {error}
                    </Typography>
                    <FormGroup className='mb-3'>
                        <TextField
                            required
                            label='Tên'
                            type='text'
                            error={errors.name}
                            {...register('name', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='name' />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <TextField
                            required
                            type='email'
                            label='Email'
                            error={errors.email}
                            {...register('email', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='email' />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <TextField
                            required
                            type='password'
                            label='Mật khẩu'
                            error={errors.password}
                            {...register('password', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='password' />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <TextField
                            required
                            type='password'
                            label='Xác nhận mật khẩu'
                            error={errors.confirmPassword}
                            {...register('confirmPassword', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='confirmPassword' />
                    </FormGroup>
                    <Typography variant='inherit' className='mb-3 '>
                        Đã có tài khoản.{' '}
                        <Link className='text-primary' to={routes.login.path}>
                            {' '}
                            Đăng nhập!
                        </Link>
                    </Typography>
                    <LoadingButton variant='contained' size='large' type='submit' fullWidth loading={loading}>
                        Tạo tài khoản
                    </LoadingButton>
                </Box>
                <ToastContainer />
            </Grid>
        </Grid>
    )
}

export default RegisterPage

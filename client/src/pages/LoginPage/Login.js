import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { login, loginSuccess } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import { Box, Grid, Stack, TextField, Typography, FormGroup } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import routes from 'src/utils/routes'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'
import Image from '~/components/Image'
import { showToast } from 'src/redux/slice/toastSlice'
import { LoadingButton } from '@mui/lab'

const registerData = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const Login = () => {
    useDocumentTitle('Đăng nhập')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerData)
    })

    const onSubmit = async data => {
        setLoading(true)
        try {
            const res = await loginAPI(data)
            dispatch(login(res))
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            dispatch(showToast({ type: 'error', message: `${error.message}` }))
            setError(error.response?.data.message)
        }
    }

    return (
        <Grid>
            <Grid className='form-container d-flex justify-content-center align-items-center'>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} className='shadow rounded py-5 px-4 form-wrap '>
                    <Stack className='img-wrap mb-3'>
                        <Image src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </Stack>
                    <Typography variant='inherit' className='text-danger mb-2'>
                        {error}
                    </Typography>
                    <FormGroup className='mb-3'>
                        <TextField
                            type='email'
                            required
                            label='Email'
                            error={errors.email}
                            {...register('email', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='email' />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <TextField
                            type='password'
                            error={errors.password}
                            label='Mật khẩu'
                            required
                            {...register('password', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='password' />
                    </FormGroup>
                    <Stack marginBottom='12px' direction='row' justifyContent='space-between'>
                        <Typography variant='inherit'>Quên mật khẩu?</Typography>
                        <Link className='text-primary' to={routes.register.path}>
                            Đăng kí ngay!
                        </Link>
                    </Stack>
                    <LoadingButton fullWidth type='submit' loading={loading} variant='contained' size='large'>
                        Đăng nhập
                    </LoadingButton>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login

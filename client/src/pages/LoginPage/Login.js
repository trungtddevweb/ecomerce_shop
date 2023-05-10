import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { loginSuccess, loginFailed } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import { Box, Grid, Stack, TextField, Typography, FormGroup, useTheme, useMediaQuery } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import routes from 'src/utils/routes'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'
import Image from '~/components/Image'
import { showToast } from 'src/redux/slice/toastSlice'
import { LoadingButton } from '@mui/lab'
import { makeStyles } from '@mui/styles'
import loginBg from '~/assets/imgs/login-bg.jpg'

const registerData = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    },
    formWrap: {
        width: '500px',
        maxWidth: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
    },
    loginBg: {
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
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
            dispatch(loginSuccess(res))
            setLoading(false)
            navigate('/')
        } catch (error) {
            dispatch(loginFailed(error))
            setLoading(false)
            dispatch(showToast({ type: 'error', message: `${error.message}` }))
            setError(error.response?.data.message)
        }
    }
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Grid className={classes.loginBg}>
            <Grid className={classes.container}>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} className={classes.formWrap}>
                    <Stack>
                        <Image src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </Stack>
                    <Typography variant='inherit' className='text-danger mb-2'>
                        {error}
                    </Typography>
                    <FormGroup>
                        <TextField
                            type='email'
                            required
                            label='Email'
                            error={errors.email}
                            sx={{ mb: 2 }}
                            {...register('email', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='email' />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            type='password'
                            error={errors.password}
                            label='Mật khẩu'
                            required
                            sx={{ mb: 2 }}
                            {...register('password', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='password' />
                    </FormGroup>
                    <Stack marginBottom='12px' direction='row' justifyContent='space-between'>
                        <Typography variant='inherit'>Quên mật khẩu?</Typography>
                        <Link to={routes.register.path}>Đăng kí ngay!</Link>
                    </Stack>
                    <LoadingButton fullWidth type='submit' loading={loading} variant='contained' size='large'>
                        Đăng nhập
                    </LoadingButton>
                    {isMatch && <p color={'red'}>Hello world</p>}
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login

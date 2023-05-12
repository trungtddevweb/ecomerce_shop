import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { login } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import { Box, Stack, TextField, Typography, FormGroup, InputAdornment, IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'
import { LoadingButton } from '@mui/lab'
import useStyles from '~/assets/styles/useStyles'
import loginBanner from '~/assets/imgs/banner-login.jpg'
import loginBg from '~/assets/imgs/login-bg.jpg'
import Image from 'mui-image'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useToggle from '~/hooks/useToggle'

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
    const classes = useStyles()
    const [showPassword, setShowPassword] = useToggle(false)

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
            navigate(-1)
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    }

    return (
        <Box
            p={1}
            className={[classes.flexBox, classes.authBg]}
            sx={{
                background: `url(${loginBg})`
            }}
        >
            <Box
                borderRadius={2}
                p={2}
                bgcolor='white'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: {
                        xs: 500
                    },
                    zIndex: 10
                }}
            >
                <Typography marginY={2} fontWeight={600} color='primary' variant='h5' textAlign='center'>
                    Welcome Back!
                </Typography>
                <Stack className={classes.flexBox}>
                    <Image duration={0} src={loginBanner} alt='Banner' />
                </Stack>
                <Typography variant='body2' marginY={2} color='error'>
                    {error}
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                    <Stack spacing={2} marginBottom={2}>
                        <FormGroup>
                            <TextField
                                type='email'
                                label='Email'
                                error={errors.email}
                                fullWidth
                                {...register('email', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='email' />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label='Mật khẩu'
                                {...register('password', { required: true })}
                                error={errors.email}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={setShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <ErrorMessages errors={errors} fieldName='password' />
                        </FormGroup>
                    </Stack>
                    <LoadingButton fullWidth type='submit' loading={loading} variant='contained' size='large'>
                        Đăng nhập
                    </LoadingButton>
                    <Stack marginY={2} direction='row' justifyContent='space-between'>
                        <Typography color='primary' variant='body2'>
                            Quên mật khẩu?
                        </Typography>
                        <Typography
                            component={Link}
                            className={classes.hoverItem}
                            to='/register'
                            color='primary'
                            variant='body2'
                        >
                            Đăng kí ngay
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Login

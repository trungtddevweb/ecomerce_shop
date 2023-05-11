import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { login } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import {
    Box,
    Grid,
    Stack,
    TextField,
    Typography,
    FormGroup,
    Container,
    FormControlLabel,
    Checkbox,
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import routes from 'src/utils/routes'
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

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '0 10px'
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
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
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
            navigate('/')
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    }
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box
            p={1}
            className={classes.flexBox}
            sx={{
                width: '100vw',
                height: '100vh',
                background: `url(${loginBg})`,
                backgroundSize: 'cover',
                zIndex: 9,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
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
                        <Typography component={Link} to='/register' color='primary' variant='body2'>
                            Đăng kí ngay
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Login

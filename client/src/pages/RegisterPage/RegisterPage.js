import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    Box,
    Button,
    FormGroup,
    Grid,
    InputLabel,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Avatar
} from '@mui/material'
import { registerAPI } from '~/api/main'
import { Link, useNavigate } from 'react-router-dom'
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
import { makeStyles } from '@mui/styles'
import registerBg from '~/assets/imgs/register-bg.jpeg'
const registerData = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null])
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
    avatar: {
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    registerBg: {
        height: '100vh',
        backgroundImage: `url(${registerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
})
const RegisterPage = () => {
    useDocumentTitle('Đăng kí')
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
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
    const classes = useStyles()
    return (
        <Grid container className={classes.registerBg}>
            <Grid item className={classes.container}>
                <Box component='form' onSubmit={handleSubmit(onSubmitRegiser)} className={classes.formWrap}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <Avatar alt='' src={previewImg || images.registerLogo} className={classes.avatar} />
                            <TextField
                                type='file'
                                id='image-upload'
                                hidden
                                accept='image/png, image/jpeg, image/jgp'
                                {...register('picture', {
                                    required: true,
                                    onChange: e => {
                                        setPreviewImg(URL.createObjectURL(e.target.files[0]))
                                    }
                                })}
                            />
                        </FormGroup>
                        <InputLabel
                            htmlFor='image-upload'
                            sx={{
                                position: 'relative',
                                top: '-22px',
                                left: '45%',
                                width: '50%'
                            }}
                        >
                            <Avatar sx={{ backgroundColor: '#0d6efd' }}>
                                <Add />
                            </Avatar>
                        </InputLabel>
                    </Grid>

                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                required
                                label='Tên'
                                type='text'
                                fullWidth
                                sx={{ mb: 2 }}
                                error={errors.name}
                                {...register('name', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='name' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                required
                                type='email'
                                label='Email'
                                sx={{ mb: 2 }}
                                error={errors.email}
                                {...register('email', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='email' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                required
                                type='password'
                                label='Mật khẩu'
                                sx={{ mb: 2 }}
                                error={errors.password}
                                {...register('password', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='password' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                required
                                type='password'
                                label='Xác nhận mật khẩu'
                                sx={{ mb: 2 }}
                                error={errors.confirmPassword}
                                {...register('confirmPassword', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='confirmPassword' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} item>
                        <Typography variant='inherit' sx={{ mb: 2 }}>
                            Đã có tài khoản.
                            <Link to={routes.login.path}>Đăng nhập!</Link>
                        </Typography>
                    </Grid>

                    <Grid xs={12} item>
                        <Typography variant='inherit' color={'red'} sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <LoadingButton variant='contained' size='large' type='submit' fullWidth loading={loading}>
                            Tạo tài khoản
                        </LoadingButton>
                    </Grid>
                </Box>
                <ToastContainer />
            </Grid>
        </Grid>
    )
}

export default RegisterPage

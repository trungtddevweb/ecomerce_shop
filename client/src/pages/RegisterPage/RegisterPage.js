import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    Box,
    FormGroup,
    Grid,
    InputLabel,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Avatar,
    Stack,
    InputAdornment,
    IconButton
} from '@mui/material'
import { registerAPI } from '~/api/main'
import { Link, useNavigate } from 'react-router-dom'
import routes from 'src/utils/routes'
import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import images from '~/assets/imgs'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { LoadingButton } from '@mui/lab'
import useStyles from '~/assets/styles/useStyles'
import registerBg from '~/assets/imgs/register-bg.jpeg'
import { green } from '@mui/material/colors'
import Image from 'mui-image'
import useToggle from '~/hooks/useToggle'

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
    const [showPassword, setShowPassword] = useToggle(false)
    const [showConfirmPW, setShowConfirmPW] = useToggle(false)
    const classes = useStyles()

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
            setError(err.response.data.message)
        }
    }
    return (
        <Box
            p={1}
            sx={{
                background: `url(${registerBg})`
            }}
            className={[classes.flexBox, classes.authBg]}
        >
            <Grid container className={classes.flexBox}>
                <Box component='form' onSubmit={handleSubmit(onSubmitRegiser)} className={classes.formWrap}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            position: 'relative',
                            marginY: 2
                        }}
                    >
                        <FormGroup className={classes.flexBox}>
                            <Image
                                alt=''
                                width={120}
                                height={120}
                                duration={0}
                                sx={{ borderRadius: '50%' }}
                                src={previewImg || images.registerLogo}
                            />
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
                                position: 'absolute',
                                left: '40%',
                                bottom: 0
                            }}
                        >
                            <Avatar sx={{ width: 24, height: 24, bgcolor: green[800] }}>
                                <Add />
                            </Avatar>
                        </InputLabel>
                    </Grid>
                    <Typography variant='body1' color='error'>
                        {error}
                    </Typography>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                required
                                label='Tên'
                                type='text'
                                sx={{ mt: 2 }}
                                fullWidth
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
                                sx={{ mt: 2 }}
                                error={errors.email}
                                {...register('email', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='email' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label='Mật khẩu'
                                {...register('password', { required: true })}
                                error={errors.password}
                                sx={{ mt: 2 }}
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
                    </Grid>
                    <Grid xs={12} item>
                        <FormGroup>
                            <TextField
                                type={showConfirmPW ? 'text' : 'password'}
                                label='Xác nhận mật khẩu'
                                {...register('confirmPassword', { required: true })}
                                error={errors.confirmPassword}
                                fullWidth
                                sx={{ mt: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={setShowConfirmPW}>
                                                {showConfirmPW ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <ErrorMessages errors={errors} fieldName='confirmPassword' />
                        </FormGroup>
                    </Grid>
                    <Grid xs={12} marginY={2} item>
                        <Stack direction='row' sx={{ mb: 2 }} spacing={1}>
                            <Typography variant='body1'>Đã có tài khoản.</Typography>
                            <Typography
                                component={Link}
                                className={classes.hoverItem}
                                to='/login'
                                color='primary'
                                variant='body1'
                            >
                                Đăng nhập!
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12} item>
                        <LoadingButton variant='contained' size='large' type='submit' fullWidth loading={loading}>
                            Tạo tài khoản
                        </LoadingButton>
                    </Grid>
                </Box>
                <ToastContainer />
            </Grid>
        </Box>
    )
}

export default RegisterPage

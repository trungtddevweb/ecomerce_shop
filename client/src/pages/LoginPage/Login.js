import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { loginSuccess, loginFailed } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button/Button'
import Form from 'react-bootstrap/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/Loading'
import routes from 'src/utils/routes'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'

const registerData = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})


const Login = () => {
    useDocumentTitle("Đăng nhập")
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
            setError(error.response?.data.message)
        }
    }

    return (
        <div className='login-page'>
            <div className='form-container d-flex justify-content-center align-items-center '>
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-4 form-wrap '>
                    <div className='img-wrap mb-3'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>
                    <p className='text-danger'>{error}</p>
                    <div className='mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName="email" />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            {...register('password', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName="password" />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Quên mật khẩu?</p>
                        <Button to={routes.register.path}>
                            <p className='text-primary'>Đăng kí ngay!</p>
                        </Button>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Đăng nhập
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default Login

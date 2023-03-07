import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/api/main'
import { loginSuccess, loginFailed } from 'src/redux/slice/usersSlice'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/Loading'

const registerData = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})
const Login = () => {
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

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await loginAPI(data)
            dispatch(loginSuccess(res.data))
            setLoading(false)
            navigate('/')
        } catch (error) {
            dispatch(loginFailed(error))
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <div className='form-container d-flex justify-content-center align-items-center '>
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-4 form-wrap '>
                    <div className='img-wrap mb-3'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>

                    <div className='mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                    </div>
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            {...register('password', { required: true })}
                        />
                    </div>
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                    {errors.username?.type === 'required' && (
                        <span className='text-danger mb-12 d-block'>Username không được để trống</span>
                    )}
                    <p className='text-danger'>{error}</p>
                    <div className='d-flex justify-content-between'>
                        <a href='/forgot'>Forget Password?</a>
                        <a href='/register'>
                            <p className='text-primary'>Register now!</p>
                        </a>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Login
                        </Button>
                    )}
                </Form>
            </div>
        </>
    )
}

export default Login

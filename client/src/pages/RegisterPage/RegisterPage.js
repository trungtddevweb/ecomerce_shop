import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { registerAPI } from '~/api/main'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '~/components/Loading'

const registerData = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassowrd: yup.string().oneOf([yup.ref('password'), null])
})

const RegisterPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(registerData) })
    const onSubmitRegiser = async data => {
        setLoading(true)
        console.log(data)
        try {
            const res = await registerAPI(data)
            if (res) {
                setLoading(false)
                navigate('/login')
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
            setError(err.response.data.message)
        }
    }
    return (
        <>
            <div className=' form-container d-flex justify-content-center align-items-center'>
                <Form onSubmit={handleSubmit(onSubmitRegiser)} className='shadow p-4 rounded form-wrap'>
                    <div className='img-wrap mb-3'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            {...register('name', { required: true })}
                        />
                        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
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
                    <p className='text-danger'>{error}</p>
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            {...register('password', { required: true })}
                        />
                    </div>
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}

                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Confirm Password'
                            {...register('confirmPassword', { required: true })}
                        />
                    </div>
                    {errors.confirmPassowrd && <p className='text-danger'>password don't match</p>}
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Register
                        </Button>
                    )}
                </Form>
            </div>
        </>
    )
}

export default RegisterPage

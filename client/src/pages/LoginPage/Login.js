import React from 'react'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onSubmit = data => console.log(data)
    return (
        <>
            <div className='form-container d-flex justify-content-center align-items-center'>
                <Form onSubmit={handleSubmit(onSubmit)} className='shadow rounded p-4 form-wrap'>
                    <div className='img-wrap'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>
                    <h3 className='text-center mb-5'>Welcome Back!</h3>
                    <div className='form-floating mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            id='floatingInput'
                            placeholder='Username'
                            {...register('username', { required: true })}
                        />
                        <label htmlFor='floatingInput'>Username</label>
                    </div>
                    {errors.username?.type === 'required' && (
                        <p className='text-danger'>Username không được để trống</p>
                    )}
                    <div className='form-floating  mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            id='floatingInput'
                            placeholder='Passowrd'
                            {...register('password', { required: true })}
                        />
                        <label htmlFor='floatingInput'>Password</label>
                    </div>
                    {errors.password?.type === 'required' && (
                        <p className='text-danger'>Password không được để trống</p>
                    )}

                    <div className='d-flex justify-content-between'>
                        <p>Forget Password?</p>
                        <a href='/register'>
                            <p className='text-primary'>Register now!</p>
                        </a>
                    </div>

                    <Button type='submit' variant='primary' className='btn'>
                        Login
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Login

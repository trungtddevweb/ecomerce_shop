import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
const registerData = yup.object().shape({
    username: yup.string().required('Username không được để trống'),
    password: yup.string().required('Password không được để trống').min(6),
    confirmPassowrd: yup.string().oneOf([yup.ref('password'), null])
})
const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(registerData) })
    const onSubmit = data => console.log(data)
    return (
        <>
            <div className=' form-container d-flex justify-content-center align-items-center'>
                <Form onSubmit={handleSubmit(onSubmit)} className=' shadow p-4 rounded form-wrap'>
                    <div className='img-wrap'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>
                    <h3 className='text-center mb-5'>Register Form</h3>
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
                    {errors.username && <p className='text-danger'>{errors.username.message}</p>}

                    <div className='form-floating mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            id='floatingInput'
                            placeholder='Password'
                            {...register('password', { required: true, minLength: 6 })}
                        />

                        <label htmlFor='floatingInput'>Password</label>
                    </div>
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                    {errors.password?.type === 'minLength' && <p>Password must be 6 characters long</p>}
                    <div className='form-floating mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            id='floatingInput'
                            placeholder='ConfirmPassowrd'
                            {...register('confirmPassowrd', { required: true })}
                        />
                        <label htmlFor='floatingInput'>ConfirmPassowrd</label>
                    </div>

                    {errors.confirmPassowrd && <p className='text-danger'>password don't match</p>}
                    <Button type='submit' variant='primary' className='btn'>
                        Register
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default RegisterPage

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/CustomLoading'

const registerData = yup.object().shape({
    oldPass: yup.string().required().min(6),
    newPass: yup.string().required().min(6)
})
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerData)
    })
    const forgotPass = data => {
        setLoading(true)
        console.log(data)
        axios
            .post('https://ecomerce-shopping.onrender.com/api/auth/forgot', data)
            .then(() => {
                navigate('/login')
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <div className='form-container d-flex justify-content-center align-items-center '>
                <Box component="form" onSubmit={handleSubmit(forgotPass)} className='shadow rounded p-4 form-wrap '>
                    <div className='img-wrap mb-3'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div>

                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Oldpass'
                            {...register('oldPass', { required: true })}
                        />
                    </div>
                    {errors.oldPass && <p className='text-danger'>{errors.oldPass.message}</p>}
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='NewPassword'
                            {...register('newPass', { required: true })}
                        />
                    </div>
                    {errors.newPass && <p className='text-danger'>{errors.newPass.message}</p>}

                    {/* <p className='text-danger'>{error}</p> */}

                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Login
                        </Button>
                    )}
                </Box>
            </div>
        </>
    )
}

export default ForgotPassword

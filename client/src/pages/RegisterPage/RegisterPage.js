import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'src/components/Button'
import Form from 'react-bootstrap/Form'
import { registerAPI } from '~/api/main'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '~/components/Loading'
import routes from 'src/utils/routes'
import { Add } from '@mui/icons-material'
import images from '~/assets/imgs'
import Image from '~/components/Image/Image'
import DynamicTitle from 'src/utils/DynamicTitle'

const registerData = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassowrd: yup.string().oneOf([yup.ref('password'), null])
})


const RegisterPage = () => {
    DynamicTitle('Register')
    const [previewImg, setPreviewImg] = useState(null)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm(
        { resolver: yupResolver(registerData) }
    )

    const onSubmitRegiser = async data => {
        const formData = new FormData()
        formData.append('picture', data.picture[0])
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirmPassword', data.confirmPassword)

        setLoading(true)
        try {
            const res = await registerAPI(data)
            if (res) {
                setLoading(false)
                navigate('/login')
            }
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    }

    return (
        <div className='register-page'>
            <div className='form-container d-flex justify-content-center align-items-center'>
                <Form onSubmit={handleSubmit(onSubmitRegiser)} className='shadow p-4 rounded form-wrap'>
                    {/* <div className='mb-3 img-wrap'>
                        <img src='https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_1280.jpg' alt='' />
                    </div> */}
                    <div className='mb-3 text-center'>
                        <h3>Welcome To Us</h3>
                    </div>
                    <div className="choose-image my-3 m-auto">
                        <div className='d-flex align-items-center justify-content-center'>
                            <Image alt="" src={previewImg || images.registerLogo} className='register-profile-pic' />
                            <input
                                name="picture"
                                type="file"
                                id="image-upload"
                                hidden
                                accept="image/png, image/jpeg"
                                {...register('picture', {
                                    required: true,
                                    onChange: (e) => {
                                        setPreviewImg(URL.createObjectURL(e.target.files[0]))
                                    }
                                })}
                            />
                        </div>
                        {errors.picture && <p className='text-danger'>{errors.picture.message}</p>}
                        <label htmlFor="image-upload" className='image-upload-label bg-primary' >
                            <Add className="upload-btn" />
                        </label>
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
                    <div className='mb-3 '>Have an account.<Button className="text-primary" to={routes.login.path}> Login now!</Button> </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Register
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage

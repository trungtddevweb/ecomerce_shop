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
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import ErrorMessages from '~/components/ErrorMessages'

const registerData = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null])
})


const RegisterPage = () => {
    useDocumentTitle('Đăng kí')
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
            const res = await registerAPI(formData)
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
                        <h3>Đăng Kí</h3>
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
                        <label htmlFor="image-upload" className='image-upload-label bg-primary' >
                            <Add className="upload-btn" />
                        </label>
                    </div>
                    <p className='text-danger'>{error}</p>
                    <div className='mb-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Tên'
                            {...register('name', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName="name" />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='email' />
                    </div>
                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Mật khẩu'
                            {...register('password', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName="password" />
                    </div>

                    <div className='mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Xác nhận mật khẩu'
                            {...register('confirmPassword', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName="confirmPassword" />
                    </div>
                    <div className='mb-3 '>Đã có tài khoản.<Button className="text-primary" to={routes.login.path}> Đăng nhập ngay!</Button> </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type='submit' variant='primary' className='btn'>
                            Tạo tài khoản
                        </Button>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage

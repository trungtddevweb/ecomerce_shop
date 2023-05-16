import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createProductAPI } from '~/api/main'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '~/components/ErrorMessages'
import {
    Typography,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Grid,
    TextField,
    Box,
    InputAdornment
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { showToast } from 'src/redux/slice/toastSlice'
import { optionValueSizes } from 'src/utils/const'
const ProductComponent = ({ isMatch }) => {
    const [files, setFiles] = useState([])
    const token = useSelector(state => state.auth.user?.token)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const handleFileUpload = event => {
        const fileList = event.target.files
        const fileArray = Array.from(fileList)
        setFiles(fileArray)
    }

    const createFormData = (data, files) => {
        const formData = new FormData()
        formData.set('name', data.name)
        formData.set('desc', data.desc)
        formData.set('brand', data.brand)
        formData.set('quantity', data.quantity)
        formData.set('price', data.price)
        formData.set('category', data.category)
        formData.set('isHot', data.isHot)

        // Handlers
        const colorsChange = data.colors.split(',')
        colorsChange.forEach(colors => {
            formData.append('colors', colors)
        })

        const sizesChange = data.sizes
        sizesChange?.forEach(size => {
            formData.append('sizes', size)
        })

        for (let i = 0; i < files.length && i < 5; i++) {
            formData.append('picture', files[i])
        }

        return formData
    }

    const onSubmit = async data => {
        const formData = createFormData(data, files)
        setIsLoading(true)
        try {
            const res = await createProductAPI(formData, token)
            if (res.status === 201) {
                setIsLoading(false)
                dispatch(showToast({ type: 'success', message: 'Tạo mới sản phẩm thành công!' }))
                reset()
            }
        } catch (err) {
            console.error(err)
            setIsLoading(false)
            dispatch(showToast({ type: 'error', message: 'Tạo mới sản phẩm thất bại!' }))
        }
    }

    return (
        <Box>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6} item>
                        <TextField
                            size={isMatch ? 'small' : 'medium'}
                            label='Tên sản phẩm'
                            variant='outlined'
                            fullWidth
                            autoFocus
                            {...register('name', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='name' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            size={isMatch ? 'small' : 'medium'}
                            type='text'
                            label='Thương hiệu'
                            variant='outlined'
                            fullWidth
                            {...register('brand', { required: true })}
                        />
                        <ErrorMessages errors={errors} fieldName='brand' />
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12} md={7}>
                            <TextField
                                size={isMatch ? 'small' : 'medium'}
                                label='Chi tiết sản phẩm'
                                multiline
                                rows={isMatch ? 3 : 7}
                                variant='outlined'
                                fullWidth
                                {...register('desc', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='desc' />
                        </Grid>
                        <Grid container item xs={12} md={5} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    size={isMatch ? 'small' : 'medium'}
                                    type='number'
                                    fullWidth
                                    label='Giá'
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>đ</InputAdornment>
                                    }}
                                    required
                                    defaultValue={1}
                                    {...register('price', {
                                        validate: {
                                            lessThanZero: value => {
                                                return value >= 0 || 'Giá phải là 1 giá trị lớn hơn hoặc bằng 0'
                                            }
                                        }
                                    })}
                                />
                                {errors.price && errors.price.type === 'lessThanZero' && (
                                    <Typography className='text-danger'>{errors.price.message}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size={isMatch ? 'small' : 'medium'}
                                    fullWidth
                                    label='Màu sắc'
                                    variant='outlined'
                                    {...register('colors')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size={isMatch ? 'small' : 'medium'}
                                    type='number'
                                    label='Số lượng'
                                    variant='outlined'
                                    fullWidth
                                    required
                                    defaultValue={1}
                                    {...register('quantity', {
                                        validate: {
                                            positive: value => {
                                                return value >= 1 || 'Số lượng phải là số lớn hoặc bằng 1'
                                            }
                                        }
                                    })}
                                />
                                {errors.quantity && errors.quantity.type === 'positive' && (
                                    <Typography className='text-danger'>{errors.quantity.message}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Kích cỡ</InputLabel>
                                <Select
                                    size={isMatch ? 'small' : 'medium'}
                                    label='Kích cỡ'
                                    defaultValue={['l']}
                                    multiple
                                    {...register('sizes')}
                                >
                                    {optionValueSizes.map(size => (
                                        <MenuItem value={size.value} key={size.value}>
                                            {size.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                size={isMatch ? 'small' : 'medium'}
                                label='Phân loại'
                                variant='outlined'
                                fullWidth
                                {...register('category', { required: true })}
                            />
                            <ErrorMessages errors={errors} fieldName='category' />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Hot</InputLabel>
                                <Select
                                    size={isMatch ? 'small' : 'medium'}
                                    label='Hot'
                                    {...register('isHot')}
                                    defaultValue={'true'}
                                >
                                    <MenuItem value='true'>True</MenuItem>
                                    <MenuItem value='false'>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid xs={12} item>
                        <Typography
                            component='input'
                            type='file'
                            multiple
                            accept='image/png, image/jpeg'
                            {...register('picture', {
                                required: true,
                                onChange: e => handleFileUpload(e)
                            })}
                        />
                        <ErrorMessages errors={errors} fieldName='picture' />
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton
                            loading={isLoading}
                            fullWidth={isMatch}
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Tạo mới
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductComponent

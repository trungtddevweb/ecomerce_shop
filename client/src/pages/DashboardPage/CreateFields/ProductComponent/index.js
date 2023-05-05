import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useForm } from 'react-hook-form'
import { createProductAPI } from '~/api/main'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ProductComponent = () => {
    const token = useSelector(state => state.auth.user.token)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async data => {
        const formData = new FormData()
        const colorsChange = data.colors.split(',')
        colorsChange.forEach(colors => {
            formData.append('colors', colors)
        })
        const sizesChange = data.sizes
        sizesChange.forEach(size => {
            formData.append('sizes', size)
        })

        formData.append('picture', data.picture)
        formData.append('name', data.name)
        formData.append('desc', data.desc)
        formData.append('brand', data.brand)
        formData.append('quantity', data.quantity)
        formData.append('price', data.price)
        formData.append('category', data.category)
        formData.append('isHot', data.isHot)
        // formData.append('picture', data.picture[0])
        console.log(data.picture)

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // await createProductAPI(formData, token)

            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid xs={12} item>
                        <TextField
                            placeholder='Tên sản phẩm'
                            label='Tên sản phẩm'
                            variant='outlined'
                            fullWidth
                            required
                            {...register('name', { required: true })}
                        />
                        {errors.name && <p>ko dc de trong</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Chi tiết sản phẩm'
                            multiline
                            rows={4}
                            placeholder='Chi tiết sản phẩm'
                            variant='outlined'
                            fullWidth
                            required
                            {...register('desc')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='text'
                            placeholder='Thương hiệu'
                            label='Thương hiệu'
                            variant='outlined'
                            fullWidth
                            required
                            {...register('brand')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='number'
                            placeholder='Số lượng'
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
                            <p className='text-danger'>{errors.quantity.message}</p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='number'
                            placeholder='Giá'
                            label='Giá'
                            variant='outlined'
                            fullWidth
                            required
                            defaultValue={0}
                            {...register('price', {
                                validate: {
                                    lessThanZero: value => {
                                        return value >= 0 || 'Giá phải là 1 giá trị lớn hơn hoặc bằng 0'
                                    }
                                }
                            })}
                        />
                        {errors.price && errors.price.type === 'lessThanZero' && (
                            <p className='text-danger'>{errors.price.message}</p>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder='Màu sắc'
                            label='Màu sắc'
                            variant='outlined'
                            fullWidth
                            {...register('colors')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Kích cỡ</InputLabel>
                            <Select label='Kích cỡ' defaultValue={['l']} multiple {...register('sizes')}>
                                <MenuItem value='s'>s</MenuItem>
                                <MenuItem value='m'>m</MenuItem>
                                <MenuItem value='l'>l</MenuItem>
                                <MenuItem value='xl'>xl</MenuItem>
                                <MenuItem value='xxl'>xxl</MenuItem>
                                <MenuItem value='3xl'>3xl</MenuItem>
                                <MenuItem value='4xl'>4xl</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            placeholder='Phân loại'
                            label='Phân loại'
                            variant='outlined'
                            fullWidth
                            {...register('category')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Hot</InputLabel>
                            <Select label='Màu sắc' {...register('isHot')} defaultValue={'true'}>
                                <MenuItem value='true'>dung</MenuItem>
                                <MenuItem value='false'>sai</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                        <OutlinedInput
                            type='file'
                            inputProps={{ multiple: true }}
                            fullWidth
                            {...register('picture')}
                            defaultValue=''
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' color='primary' fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default ProductComponent

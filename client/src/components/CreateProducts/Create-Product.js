import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useForm } from 'react-hook-form'
import { createProductAPI } from '~/api/main'
import { useSelector } from 'react-redux'

const CreateProducts = () => {
    const token = useSelector(state => state.auth.user.token)
    const [color, setColor] = useState()
    const [size, setSize] = useState('l')
    const [hot, setHot] = useState('true')
    const [category, setCategory] = useState('all')

    const handleChange = event => {
        setColor(event.target.value)
    }
    const sizeChange = e => {
        setSize(e.target.value)
    }
    const hotChange = e => {
        setHot(e.target.value)
    }
    const categoryChange = e => {
        setCategory(e.target.value)
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const onSubmit = async data => {
        try {
            await createProductAPI(data, token)
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
                            {...register('quantity')}
                        />
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
                            {...register('price', { required: true })}
                        />
                        {errors.price && <p>ko dc de trong</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Màu sắc</InputLabel>
                            <Select label='Màu sắc' onChange={handleChange} value={color} {...register('colors')}>
                                <MenuItem value={'red'}>do</MenuItem>
                                <MenuItem value='blue'>xanh</MenuItem>
                                <MenuItem value='green'>luc</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Kích cỡ</InputLabel>
                            <Select label='Kích cỡ' onChange={sizeChange} value={size} {...register('sizes')}>
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
                        <FormControl fullWidth>
                            <InputLabel>Phân loại</InputLabel>
                            <Select
                                label='Phân loại'
                                onChange={categoryChange}
                                value={category}
                                {...register('category')}
                            >
                                <MenuItem value='all'>tat ca</MenuItem>
                                <MenuItem value='vay'>vay</MenuItem>
                                <MenuItem value='ao'>ao</MenuItem>
                                <MenuItem value='quan'>quan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Hot</InputLabel>
                            <Select label='Màu sắc' onChange={hotChange} value={hot} {...register('isHot')}>
                                <MenuItem value='true'>dung</MenuItem>
                                <MenuItem value='false'>sai</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField
                            placeholder='Hình ảnh'
                            label='Hình ảnh'
                            variant='outlined'
                            fullWidth
                            {...register('productImages')}
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

export default CreateProducts

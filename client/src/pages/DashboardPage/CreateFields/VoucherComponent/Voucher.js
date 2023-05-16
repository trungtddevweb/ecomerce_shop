import { useState } from 'react'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { Grid, Box, TextField, InputAdornment, Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { createVoucherAPI } from '~/api/main'
import { DatePicker } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

const schema = yup.object().shape({
    voucherCode: yup
        .string()
        .min(10, 'Mã voucher phải lớn hơn 10 ký tự')
        .max(20, 'Mã voucher phải nhỏ hơn 20 ký tự')
        .required('Không được để trống'),
    total: yup.number().min(1, 'Số lượng voucher không được nhỏ hơn 1').required('Không được để trống'),
    discount: yup.number().min(0, 'Giá giảm phải lớn hơn 1').required('Không được để trống')
})

const Voucher = () => {
    const today = dayjs()
    const nextDay = today.add(1, 'day')
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(state => state.auth.user?.token)
    const dispatch = useDispatch()

    const defaultValues = {
        voucherCode: '',
        total: 1,
        discount: 10000,
        startTime: today,
        endTime: nextDay
    }
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    })

    const Voucher = async data => {
        try {
            setIsLoading(true)
            await axios.post('http://localhost:5000/api/vouchers', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(showToast({ type: 'success', message: 'Tạo voucher thành công!' }))
            setIsLoading(false)
            reset()
        } catch (err) {
            console.error(err)
            setIsLoading(false)
            dispatch(showToast({ type: 'error', message: err.response.data || 'Có lỗi xảy ra hãy thử lại!' }))
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit(Voucher)}>
            <Grid container spacing={2}>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={control}
                            rules={{ minLength: 10, maxLength: 20, required: true }}
                            name='voucherCode'
                            render={({ field }) => (
                                <Stack>
                                    <TextField
                                        {...field}
                                        error={!!errors.voucherCode}
                                        label='Tên mã'
                                        autoFocus
                                        type='text'
                                        fullWidth
                                    />
                                    <Typography variant='body2' color='error'>
                                        {errors.voucherCode?.message}
                                    </Typography>
                                </Stack>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={control}
                            name='discount'
                            rules={{ min: 1, required: true }}
                            render={({ field }) => (
                                <Stack>
                                    <TextField
                                        {...field}
                                        type='number'
                                        label='Giá giảm'
                                        error={!!errors.discount}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>đ</InputAdornment>
                                        }}
                                    />
                                    <Typography variant='body2' color='error'>
                                        {errors.discount?.message}
                                    </Typography>
                                </Stack>
                            )}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name='total'
                        render={({ field }) => (
                            <Stack>
                                <TextField
                                    {...field}
                                    type='number'
                                    label='Tổng số mã'
                                    error={!!errors.total}
                                    fullWidth
                                />

                                <Typography variant='body2' color='error'>
                                    {errors.total?.message}
                                </Typography>
                            </Stack>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name='startTime'
                        render={({ field }) => (
                            <DatePicker
                                format='DD/MM/YYYY'
                                disablePast
                                label='Bắt đầu'
                                sx={{ width: '100%' }}
                                {...field}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        control={control}
                        name='endTime'
                        render={({ field }) => (
                            <DatePicker
                                disablePast
                                format='DD/MM/YYYY'
                                label='Kết thúc'
                                sx={{ width: '100%' }}
                                {...field}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton loading={isLoading} type='submit' variant='contained'>
                        Tạo mã
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Voucher

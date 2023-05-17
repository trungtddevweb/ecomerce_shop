import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Box, TextField, Grid, Typography, Stack, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { useForm, Controller } from 'react-hook-form'
import { createFlashSaleAPI } from '~/api/main'

const FlashSale = () => {
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const today = dayjs()
    const nextDay = today.add(1, 'day')

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            productId: '',
            salePrice: 10000,
            flashSaleStart: today,
            flashSaleEnd: nextDay
        }
    })

    const flashSale = async data => {
        try {
            setIsLoading(true)
            const res = await createFlashSaleAPI(data, token)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Tạo khuyến mãi thành công!' }))
                setIsLoading(false)
                reset()
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            dispatch(showToast({ type: 'error', message: err.response.data.message }))
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit(flashSale)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name='productId'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Stack>
                                <TextField
                                    {...field}
                                    autoFocus
                                    label='Mã sản phẩm'
                                    variant='outlined'
                                    type='text'
                                    fullWidth
                                    error={!!errors.productId}
                                />
                                {errors.productId && (
                                    <Typography color='error'>Mã sản phẩm không được để trống</Typography>
                                )}
                            </Stack>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name='salePrice'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Stack>
                                <TextField
                                    {...field}
                                    label='Giá sale'
                                    variant='outlined'
                                    type='number'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>đ</InputAdornment>
                                    }}
                                />
                                {errors.salePrice && (
                                    <Typography color='error'>Giá sale không được để trống</Typography>
                                )}
                            </Stack>
                        )}
                    />
                </Grid>

                <Grid item xs={6} sm={12} md={6}>
                    <Controller
                        name='flashSaleStart'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                disablePast
                                format='DD/MM/YYYY'
                                {...field}
                                label='Bắt đầu'
                                sx={{ width: '100%' }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6} sm={12} md={6}>
                    <Controller
                        name='flashSaleEnd'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                disablePast
                                format='DD/MM/YYYY'
                                {...field}
                                label='Kết thúc '
                                sx={{ width: '100%' }}
                            />
                        )}
                    />
                </Grid>
                <Grid item sx={12}>
                    <LoadingButton loading={isLoading} type='submit' variant='contained'>
                        Tạo
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FlashSale

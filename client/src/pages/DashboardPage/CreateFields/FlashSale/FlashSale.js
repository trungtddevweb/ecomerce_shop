import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Box, TextField, Grid, Typography, Stack } from '@mui/material'
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
    const flashSaleStart = dayjs()
    const flashSaleEnd = dayjs()
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            productId: '',
            salePrice: '',
            flashSaleStart: flashSaleStart,
            flashSaleEnd: flashSaleEnd
        }
    })

    const flashSale = async data => {
        console.log(data)
        try {
            setIsLoading(true)
            await createFlashSaleAPI(data, token)
            dispatch(showToast({ type: 'success', message: 'Tạo thành công!' }))
            setIsLoading(false)
            reset()

            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            dispatch(showToast({ type: 'error', message: 'Sản phẩm đã đang trong khuyến mãi' }))
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
                                <TextField {...field} label='Mã sản phẩm' variant='outlined' type='text' fullWidth />
                                {errors.productId && (
                                    <Typography sx={{ color: 'red' }}>Mã sản phẩm không được để trống</Typography>
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
                                <TextField {...field} label='Giá sale' variant='outlined' type='number' fullWidth />
                                {errors.salePrice && (
                                    <Typography sx={{ color: 'red' }}>Giá sale không được để trống</Typography>
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
                            <DatePicker {...field} label='Ngày bắt đầu FlashSale' sx={{ width: '100%' }} />
                        )}
                    />
                    {errors.flashSaleStart && (
                        <Typography sx={{ color: 'red' }}>Ngày bắt đầu FlashSale không được để trống</Typography>
                    )}
                </Grid>
                <Grid item xs={6} sm={12} md={6}>
                    <Controller
                        name='flashSaleEnd'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker {...field} label='Ngày kết thúc FlashSale' sx={{ width: '100%' }} />
                        )}
                    />
                    {errors.flashSaleEnd && (
                        <Typography sx={{ color: 'red' }}>Ngày kết thúc FlashSale không được để trống</Typography>
                    )}
                </Grid>
                <Grid item>
                    <LoadingButton loading={isLoading} type='submit' variant='contained'>
                        Tạo
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FlashSale

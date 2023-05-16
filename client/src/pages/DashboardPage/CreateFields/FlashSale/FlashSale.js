import React from 'react'
import { Box, TextField, Grid, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { useForm, Controller } from 'react-hook-form'
import { createFlashSaleAPI } from '~/api/main'

const FlashSale = () => {
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const flashSale = async data => {
        console.log(data)
        try {
            const res = await createFlashSaleAPI(data, token)
            if (res.status === 201) {
                dispatch(showToast({ type: 'success', message: 'Tạo thành công!' }))
                reset()
            }
        } catch (err) {
            console.log(err)
            dispatch(showToast({ type: 'error', message: 'Tạo thất bại!' }))
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
                            <TextField label='productId' variant='outlined' type='text' fullWidth {...field} />
                        )}
                    />
                    {errors.productId && <p>Message</p>}
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name='price'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField label='price' variant='outlined' type='number' fullWidth {...field} />
                        )}
                    />
                    {errors.price && <p>Message</p>}
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name='flashSaleStart'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <DatePicker label='flashSaleStart' sx={{ width: '100%' }} {...field} />}
                    />
                    {errors.flashSaleStart && <p>Message</p>}
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name='flashSaleEnd'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <DatePicker label='flashSaleEnd' sx={{ width: '100%' }} {...field} />}
                    />
                    {errors.flashSaleEnd && <p>Message</p>}
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained'>
                        Tạo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FlashSale

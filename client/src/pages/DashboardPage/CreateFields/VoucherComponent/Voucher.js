import React from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { createVoucherAPI } from '~/api/main'

const Voucher = () => {
    const token = useSelector(state => state.auth.user?.token)
    const dispatch = useDispatch()
    // const [date, setDate] = useState('')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()
    const Voucher = async data => {
        try {
            const res = await createVoucherAPI(data, token)
            if (res.status === 201) {
                dispatch(showToast({ type: 'success', message: 'Tạo voucher thành công!' }))
                reset()
            }
            console.log(data)
        } catch (err) {
            console.log(err)
            dispatch(showToast({ type: 'error', message: 'voucher đã được dùng!' }))
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit(Voucher)}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        label='voucherCode'
                        variant='outlined'
                        type='text'
                        fullWidth
                        {...register('voucherCode', {
                            minLength: 10,
                            maxLength: 20
                        })}
                    />
                    {errors.voucherCode && errors.voucherCode.type === 'minLength' && (
                        <p>Mã code phải ít nhất 10 kí tự</p>
                    )}
                    {errors.voucherCode && errors.voucherCode.type === 'maxLength' && <p>Mã code tối đa 20 kí tự</p>}
                </Grid>
                <Grid item xs={12}>
                    <TextField label='discount' variant='outlined' type='number' fullWidth {...register('discount')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='total' variant='outlined' type='number' fullWidth {...register('total')} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type='date'
                        variant='outlined'
                        label='expirationDate'
                        fullWidth
                        {...register('expirationDate')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label='used'
                        variant='outlined'
                        type='number'
                        fullWidth
                        defaultValue={0}
                        {...register('used')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' variant='contained'>
                        Tạo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Voucher

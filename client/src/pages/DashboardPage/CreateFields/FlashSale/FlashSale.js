import { useState } from 'react'
import dayjs from 'dayjs'
import {
    Box,
    TextField,
    Grid,
    Typography,
    Stack,
    InputAdornment,
    Autocomplete,
    CircularProgress,
    Avatar
} from '@mui/material'
import * as yup from 'yup'
import { DatePicker } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { useForm, Controller } from 'react-hook-form'
import { createFlashSaleAPI } from '~/api/main'
import useDebounce from '~/hooks/useDebounce'
import useFetchData from '~/hooks/useFetchData'
import { yupResolver } from '@hookform/resolvers/yup'

const FlashSale = () => {
    const token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const today = dayjs()
    const nextDay = today.add(1, 'day')
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)
    const { data, isLoading } = useFetchData(`/products/search?q=${debouncedQuery}`)
    const [name, setName] = useState('')
    const options = data?.map(item => item)

    const schema = yup.object().shape({
        flashSaleStart: yup
            .date()
            .required('Vui lòng chọn ngày bắt đầu')
            .max(yup.ref('flashSaleEnd'), 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'),
        flashSaleEnd: yup
            .date()
            .required('Vui lòng chọn ngày kết thúc')
            .min(yup.ref('flashSaleStart'), 'Ngày kết thúc phải lớn hơn ngày bắt đầu')
    })

    const defaultValues = {
        salePrice: 10000,
        flashSaleStart: today,
        flashSaleEnd: nextDay
    }

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    })

    const flashSale = async data => {
        const payload = {
            ...data,
            name
        }
        try {
            setLoading(true)
            const res = await createFlashSaleAPI(payload, token)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Tạo khuyến mãi thành công!' }))
                setLoading(false)
                reset()
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
            dispatch(showToast({ type: 'error', message: err.response.data.message }))
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit(flashSale)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        inputValue={name}
                        onInputChange={(event, newValue) => {
                            setName(newValue)
                        }}
                        disablePortal
                        options={options}
                        getOptionLabel={option => option.name}
                        renderOption={(props, option) => {
                            return (
                                <Box component='li' {...props} key={option._id}>
                                    <Avatar alt={option.name} src={option.productImages?.[0]} />
                                    <Typography ml={1}> {option.name}</Typography>
                                </Box>
                            )
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                fullWidth
                                label='Tên sản phẩm'
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
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
                    <Typography color='error'>{errors.flashSaleStart?.message}</Typography>
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
                    <Typography color='error'>{errors.flashSaleEnd?.message}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton loading={loading} type='submit' variant='contained'>
                        Tạo
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FlashSale

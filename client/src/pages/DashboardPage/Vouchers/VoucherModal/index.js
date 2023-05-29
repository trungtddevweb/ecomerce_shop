import { DatePicker } from '@mui/x-date-pickers'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { updatedVoucherAPI } from '~/api/main'
import dayjs from 'dayjs'

const VoucherModal = ({ open, handleClose, data, setIsDeleting }) => {
    const { voucherCode, startTime, endTime, discount, expired, total } = data
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)
    const defaultValues = {
        voucherCode,
        startTime: dayjs(startTime),
        endTime: dayjs(endTime),
        discount,
        expired,
        total
    }
    const voucherId = data._id

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues
    })

    const handleSubmitForm = async data => {
        const payload = {
            ...data,
            id: voucherId
        }
        setIsDeleting(true)
        try {
            await updatedVoucherAPI(payload, token)
            dispatch(showToast({ type: 'success', message: 'Cập nhập thành công!' }))
            handleClose()
            setIsDeleting(false)
        } catch (error) {
            dispatch(showToast({ type: 'error', message: error.response.data.error }))
            setIsDeleting(false)
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Cài đặt người dùng</DialogTitle>
            <DialogContent>
                <Box sx={{ minWidth: 500 }} component='form' mt={1}>
                    <Grid container spacing={2}>
                        <Grid container item spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='voucherCode'
                                    render={({ field }) => <TextField fullWidth label='Tên voucher' {...field} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='discount'
                                    render={({ field }) => <TextField fullWidth label='Giá giảm' {...field} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='total'
                                    render={({ field }) => <TextField fullWidth label='Số lượng' {...field} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-label'>Trạng thái</InputLabel>
                                    <Controller
                                        control={control}
                                        name='expired'
                                        render={({ field }) => (
                                            <Select {...field} label='Trạng thái'>
                                                <MenuItem value={false}>Khả dụng</MenuItem>
                                                <MenuItem value={true}>Hết hạn</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='startTime'
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
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='endTime'
                                    render={({ field }) => (
                                        <DatePicker
                                            disablePast
                                            format='DD/MM/YYYY'
                                            {...field}
                                            label='Kết thúc'
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button onClick={handleSubmit(handleSubmitForm)} disabled={!isDirty} variant='contained'>
                    Cập nhập
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default VoucherModal

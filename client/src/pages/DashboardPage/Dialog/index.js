import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    DialogContentText,
    Select,
    Box,
    MenuItem
} from '@mui/material'
import UserInfo from './UserInfo'
import SpanningTable from './SpanningTable'
import Detail from './Detail'
import { Controller, useForm } from 'react-hook-form'
import { convertStatus, statusShipping } from 'src/utils/const'
import { updateOrderByAdminAPI } from '~/api/main'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'

const DialogDashboard = ({ title, open, handleClose, data, type, setIsDeleting }) => {
    const { orderCode } = data
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)

    const defaultValues = {
        status: data.status,
        isPaid: data.isPaid
    }
    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm({
        defaultValues
    })

    const handleFormSubmit = async formData => {
        const payload = {
            ...formData,
            orderCode
        }
        setIsDeleting(true)
        try {
            const res = await updateOrderByAdminAPI(payload, token)
            if (res.status === 200) {
                setIsDeleting(false)
                dispatch(showToast({ type: 'success', message: res.data }))
                handleClose()
            }
        } catch (error) {
            setIsDeleting(true)
            console.error(error)
            dispatch(showToast({ type: 'error', message: error.message }))
        }
    }

    return type === 'view' ? (
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>{title}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600}>Khách hàng</Typography>
                            <UserInfo info={data} />{' '}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600}>Chi tiết</Typography>
                            <Detail info={data} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontWeight={600}>Đơn hàng</Typography>
                        <SpanningTable rows={data} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    ) : (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText tabIndex={-1} id='scroll-dialog-description'>
                    Chỉnh sửa trạng thái đơn hàng/trạng thái thanh toán dựa theo tình trạng shipping hoặc đã thanh toán
                    toán sau đó bằng cách chuyển khoản hoặc phương thức khác.
                </DialogContentText>
                <Box component='form'>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                control={control}
                                name='status'
                                render={({ field }) => (
                                    <Select fullWidth {...field}>
                                        {statusShipping.map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {convertStatus(item)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                control={control}
                                name='isPaid'
                                render={({ field }) => (
                                    <Select disabled={defaultValues.isPaid} fullWidth {...field}>
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button disabled={!isDirty} onClick={handleSubmit(handleFormSubmit)} variant='contained'>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDashboard

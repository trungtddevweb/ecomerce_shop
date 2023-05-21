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
import { LoadingButton } from '@mui/lab'

const DialogDashboard = ({ title, open, handleClose, data, type }) => {
    let defaultValues = {}

    defaultValues = {
        status: data.status,
        isPaid: data.isPaid
    }
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues,
        shouldUnregister: false
    })

    const handleFormSubmit = formData => {
        // Xử lý submit form tại đây
        console.log(formData)
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
                <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
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
                                    <Select fullWidth {...field}>
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
                <LoadingButton disabled={!isDirty} type='submit' variant='contained'>
                    Xác nhận
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDashboard

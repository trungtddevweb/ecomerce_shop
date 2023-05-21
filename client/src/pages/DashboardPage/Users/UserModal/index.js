import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const UserModal = ({ open, handleClose, data }) => {
    console.log(data)
    const defaultValues = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isActive: data.isActive
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues
    })

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
                                    name='name'
                                    render={({ field }) => <TextField fullWidth label='Tên' {...field} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field }) => <TextField fullWidth label='Email' {...field} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontWeight={600}>Đơn hàng</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button disabled={!isDirty} variant='contained' onClick={handleClose}>
                    Cập nhập
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UserModal

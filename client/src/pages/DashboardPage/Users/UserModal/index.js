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
import { updatedUserByAdminAPI } from '~/api/main'

const UserModal = ({ open, handleClose, data, setIsDeleting }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)
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

    const handleSubmitForm = async data => {
        setIsDeleting(true)
        try {
            await updatedUserByAdminAPI(data, token)
            dispatch(showToast({ type: 'success', message: 'Cập nhập thành công!' }))
            handleClose()
            setIsDeleting(false)
        } catch (error) {
            dispatch(showToast({ type: 'error', message: error.message }))
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
                            <Controller
                                control={control}
                                name='address'
                                render={({ field }) => <TextField fullWidth label='Địa chỉ' {...field} />}
                            />
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='phone'
                                    render={({ field }) => <TextField fullWidth label='Số điện thoại' {...field} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-label'>Trạng thái</InputLabel>
                                    <Controller
                                        control={control}
                                        name='isActive'
                                        render={({ field }) => (
                                            <Select {...field} label='Trạng thái'>
                                                <MenuItem value={true}>Hoạt động</MenuItem>
                                                <MenuItem value={false}>Chặn</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
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
export default UserModal

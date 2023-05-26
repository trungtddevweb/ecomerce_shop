import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Select,
    Box,
    MenuItem,
    Stack,
    Divider,
    TextField,
    FormControl,
    InputLabel
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { sizeLists } from 'src/utils/const'
import { updatedProductAPI } from '~/api/main'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import useStyles from '~/assets/styles/useStyles'
import { formatDate, formatPrice } from 'src/utils/format'
import Image from 'mui-image'

const DialogProducts = ({ title, open, handleClose, data, type, setIsDeleting }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)
    const classes = useStyles()
    const {
        _id,
        name,
        desc,
        productImages,
        countPurchased,
        createdAt,
        colors,
        sizes,
        brand,
        category,
        price,
        quantity
    } = data

    const defaultValues = {
        name,
        desc,
        price,
        quantity,
        colors,
        sizes,
        brand,
        category
    }
    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm({
        defaultValues
    })

    const handleFormSubmit = async valueForm => {
        const formData = new FormData()
        colors.forEach(colors => {
            formData.append('colors', colors)
        })

        sizes?.forEach(size => {
            formData.append('sizes', size)
        })

        const payload = {
            ...valueForm,
            formData,
            productId: _id
        }
        try {
            setIsDeleting(true)
            const res = await updatedProductAPI(payload, token)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Cập nhập thành công!' }))
                setIsDeleting(false)
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
            <Divider component='div' variant='fullWidth' />
            <DialogContent>
                <Stack spacing={1} width={800}>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Mã sản phẩm:{' '}
                        </Typography>
                        <Typography fontWeight={600} color='error'>
                            {_id}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Tên sản phẩm:{' '}
                        </Typography>
                        <Typography fontWeight={600}>{name}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Miêu tả:{' '}
                        </Typography>
                        <Typography className={classes.limitLines} paragraph variant='subtitle1'>
                            {desc}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Thương hiệu:{' '}
                        </Typography>
                        <Typography>{brand}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Tag:{' '}
                        </Typography>
                        <Typography>{category}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Kích thước:{' '}
                        </Typography>
                        <Typography>{sizes.join(' ').toUpperCase()}</Typography>
                    </Stack>

                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Màu sắc:{' '}
                        </Typography>
                        <Typography>{colors.join(' ').toUpperCase()}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Giá:{' '}
                        </Typography>
                        <Typography fontWeight={600} color='error'>
                            {formatPrice(price)} đ
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Còn lại:{' '}
                        </Typography>
                        <Typography>{quantity} sản phẩm</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Đã bán:{' '}
                        </Typography>
                        <Typography>{countPurchased}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Ngày tạo:{' '}
                        </Typography>
                        <Typography>{formatDate(createdAt)}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography
                            sx={{
                                minWidth: '100px'
                            }}
                        >
                            Ảnh sản phẩm:{' '}
                        </Typography>
                        <Stack direction='row' gap={1}>
                            {productImages.map(image => (
                                <Image key={image} src={image} width={120} height={120} duration={0} alt='' />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    ) : (
        <Dialog open={open} maxWidth={false} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Cập nhập đơn hàng</DialogTitle>
            <Divider component='div' variant='fullWidth' />
            <DialogContent>
                <Box component='form'>
                    <Grid width={1000} container spacing={2} mt={1}>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Controller
                                    control={control}
                                    name='name'
                                    render={({ field }) => <TextField {...field} fullWidth label='Tên sản phẩm' />}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    control={control}
                                    name='price'
                                    render={({ field }) => <TextField {...field} fullWidth label='Giá niêm yết' />}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name='desc'
                                render={({ field }) => (
                                    <TextField {...field} multiline rows={4} fullWidth label='Miêu tả' />
                                )}
                            />
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='brand'
                                    render={({ field }) => <TextField {...field} fullWidth label='Thương hiệu' />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    control={control}
                                    name='category'
                                    render={({ field }) => <TextField {...field} fullWidth label='Tag' />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Controller
                                    control={control}
                                    name='colors'
                                    render={({ field }) => <TextField {...field} fullWidth label='Màu sắc' />}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id='sizes'>Kích thước</InputLabel>
                                    <Controller
                                        control={control}
                                        name='sizes'
                                        render={({ field }) => (
                                            <Select multiple label='Kích thước' fullWidth {...field}>
                                                {sizeLists.map((item, index) => (
                                                    <MenuItem value={item.value} key={index}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Controller
                                    control={control}
                                    name='quantity'
                                    render={({ field }) => (
                                        <TextField type='number' {...field} fullWidth label='Số lượng' />
                                    )}
                                />
                            </Grid>
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

export default DialogProducts

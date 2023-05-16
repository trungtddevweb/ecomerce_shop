import { Box, Typography, Grid, Avatar, Divider, TextField, Button, Stack, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatedUserAPI } from '~/api/main'
import { useForm, Controller } from 'react-hook-form'
import useStyles from '~/assets/styles/useStyles'
import { Edit } from '@mui/icons-material'
import { showToast } from 'src/redux/slice/toastSlice'
import { updatedUser } from 'src/redux/slice/usersSlice'

const Settings = () => {
    const token = useSelector(state => state.auth.user?.token)
    const [isEdit, setIsEdit] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.info)
    const { name, email, phone } = user
    const defaultValues = {
        name,
        email,
        phone
    }

    const {
        reset,
        control,
        formState: { isDirty, isValid },
        handleSubmit
    } = useForm({
        defaultValues
    })

    const handleEdit = () => {
        setIsEdit(true)
    }

    const cancelEdit = () => {
        setIsEdit(false)
        reset()
    }

    const onSubmitEdit = async data => {
        try {
            const res = await updatedUserAPI(data, token)
            if (res.status === 200) {
                dispatch(updatedUser(res.data))
                dispatch(showToast({ type: 'success', message: 'Cập nhập thành công!' }))
                setIsEdit(false)
            }
        } catch (err) {
            console.error(err)
            dispatch(showToast({ type: 'error', message: 'Cập nhập thất bại!' }))
            setIsEdit(false)
        }
    }

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmitEdit)}>
            <Stack height={72} padding={2} direction='row' bgcolor='aliceblue' justifyContent='space-between'>
                <Typography variant='h5' color='primary'>
                    Hồ sơ của tôi
                </Typography>
                {!isEdit && (
                    <IconButton onClick={handleEdit}>
                        <Tooltip title='Chỉnh sửa'>
                            <Edit />
                        </Tooltip>
                    </IconButton>
                )}
            </Stack>
            <Divider variant='fullWidth' component='div' />
            <Grid p={2} container spacing={2}>
                {isEdit ? (
                    <Grid xs={12} sm={6} item md={6} display='flex' gap={2} flexDirection='column'>
                        <Stack direction='row' alignItems='center'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Tên đăng nhập:
                            </Typography>
                            <Controller
                                control={control}
                                name='name'
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState
                                }) => (
                                    <TextField
                                        defaultValue={defaultValues.name}
                                        size='small'
                                        onBlur={onBlur} // notify when input is touched
                                        onChange={onChange} // send value to hook form
                                        checked={value}
                                        inputRef={ref}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Email:
                            </Typography>
                            <Controller
                                control={control}
                                name='email'
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <TextField
                                        defaultValue={defaultValues.email}
                                        type='email'
                                        size='small'
                                        onBlur={onBlur} // notify when input is touched
                                        onChange={onChange}
                                        checked={value}
                                        inputRef={ref}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Số điện thoại:
                            </Typography>
                            <Controller
                                control={control}
                                name='phone'
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error }
                                }) => (
                                    <TextField
                                        defaultValue={defaultValues.phone}
                                        size='small'
                                        onBlur={onBlur} // notify when input is touched
                                        onChange={onChange}
                                        checked={value}
                                        inputRef={ref}
                                    />
                                )}
                            />
                        </Stack>

                        {isEdit && (
                            <Stack direction='row' spacing={1} justifyContent='flex-end'>
                                <Button onClick={cancelEdit} color='error' variant='contained'>
                                    Hủy bỏ
                                </Button>
                                <Button
                                    disabled={!isDirty && isValid}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Cập nhập
                                </Button>
                            </Stack>
                        )}
                    </Grid>
                ) : (
                    <Grid xs={12} sm={6} item md={6} display='flex' gap={2} flexDirection='column'>
                        <Stack direction='row'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Tên đăng nhập:
                            </Typography>
                            <Typography>{user.name}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Email:
                            </Typography>
                            <Typography>{user.email}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Số điện thoại:
                            </Typography>
                            <Typography>{user.phone || 'Chưa cập nhập SĐT'}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Hạng hội viên:
                            </Typography>
                            <Typography>{user?.ranking || 'Chưa cập nhập'}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography variant='body1' fontWeight={600} minWidth={150}>
                                Vai trò
                            </Typography>
                            <Typography>{user.isAdmin ? 'Quản lý' : 'Khách hàng'}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Stack direction='row'>
                                <Typography variant='body1' fontWeight={600} minWidth={150}>
                                    Số đơn hàng
                                </Typography>
                                <Typography>{user.ordersCount?.length}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                )}
                <Grid item xs={12} sm={6} md={6} className={classes.flexBox}>
                    <Avatar src={user?.picture} alt='Avatar' sx={{ width: 120, height: 120 }} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Settings

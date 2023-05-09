import { Box, Typography, Grid, Avatar, Divider, TextField, Input, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAUserAPI, updatedUserAPI } from '~/api/main'
import { useForm } from 'react-hook-form'

const Settings = () => {
    const token = useSelector(state => state.auth.user.token)
    const [user, setUser] = useState({})
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getAUserAPI(token)
                setUser(user)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [token])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email
        }
    })
    const modalSubmit = async data => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('picture', data.picture[0])
        try {
            await updatedUserAPI(formData, token)

            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Box p={3}>
            <Grid container>
                <Grid xs={6} container rowSpacing={4}>
                    <Grid xs={12} item>
                        <Typography variant='h4'>Hồ sơ của tôi</Typography>
                    </Grid>
                    <Divider />
                    <Grid xs={12}>
                        <Typography variant='h6'>Tên đăng nhập:</Typography>
                        <Typography>{user.name}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant='h6'>Email:</Typography>
                        <Typography>{user.email}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant='h6'>Số điện thoại:</Typography>
                        <Typography>{user.phone}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant='h6'>Số hàng đã mua: 5</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant='h6'>Số hàng đã đặt: 10</Typography>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Avatar src={user.picture} alt='img' sx={{ width: 120, height: 120 }} />
                    <EditIcon onClick={toggleModal} />
                </Grid>
            </Grid>

            {modal ? (
                <Box component='form' onSubmit={handleSubmit(modalSubmit)}>
                    <Grid container spacing={1}>
                        <Grid xs={12} item>
                            <TextField
                                type='text'
                                variant='outlined'
                                label='Tên đăng nhập'
                                fullWidth
                                {...register('name')}
                                value={user.name}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField type='email' variant='outlined' label='Email' fullWidth {...register('email')} />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                type='number'
                                variant='outlined'
                                label='Số điện thoại'
                                fullWidth
                                {...register('phone', { maxLength: 10 })}
                            />
                            {errors.phone && errors.phone.type === 'maxLength' && <p>toi da 10 s0</p>}
                        </Grid>
                        <Grid xs={12} item>
                            <Input
                                type='file'
                                variant='outlined'
                                fullWidth
                                label='Avatar'
                                accept='.jpg,.png,.gif'
                                {...register('picture')}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button type='submit' variant='contained' fullWidth>
                                Cập nhật
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            ) : null}
        </Box>
    )
}

export default Settings

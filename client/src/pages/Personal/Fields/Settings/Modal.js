import React, { useState, useEffect } from 'react'
import { Box, TextField, Grid, Button, Input } from '@mui/material'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getAUserAPI, updatedUserAPI } from '~/api/main'

const Modal = () => {
    const token = useSelector(state => state.auth.user.token)
    const [user, setUser] = useState({})

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
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getAUserAPI(token)
                setUser(user)
                console.log(user)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [token])

    return (
        <>
            <Box component='form' onSubmit={handleSubmit(modalSubmit)}>
                <Grid container spacing={1}>
                    <Grid xs={12} item>
                        <TextField
                            type='text'
                            variant='outlined'
                            label='Tên đăng nhập'
                            fullWidth
                            {...register('name')}
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
        </>
    )
}

export default Modal

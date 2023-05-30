import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send } from '@mui/icons-material'
import { Box, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

const NewLetters = () => {
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()
    const form = useRef()

    const sendEmail = e => {
        e.preventDefault()
        setIsLoading(true)
        toast
            .promise(emailjs.sendForm('service_v4tix23', 'template_nlr2obv', form.current, 'd1CBIhunT7-fyL3nu'), {
                pending: 'Đang gửi',
                success: 'Gửi thành công!!!',
                error: 'Gửi thất bại, hãy thử lại'
            })
            .then(() => {
                setIsLoading(false)
                e.target.reset()
            })
            .catch(() => {
                setIsLoading(false)
            })
    }

    return (
        <Box
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                height: {
                    md: 250,
                    xs: 400
                }
            }}
            marginY={isMatch ? 1 : 6}
            className={classes.flexBox}
        >
            <Grid
                sx={{
                    bgcolor: 'white',
                    alignItems: 'center',
                    width: {
                        md: 1400,
                        sm: 'auto'
                    }
                }}
                padding={4}
                // borderRadius={4}
                container
            >
                <Grid item xs={12} md={5}>
                    <Stack className={isMatch && classes.flexBox}>
                        <Typography variant='h5'>Nhận thông báo ngay</Typography>
                        <Typography variant='caption' textAlign={isMatch && 'center'} color='gray' fontStyle='italic'>
                            Bạn sẽ không bỏ lỡ bất kì thông báo nào khi có các chương trình khuyến mãi đặc biệt từ chúng
                            tôi!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack
                        direction={isMatch ? 'column' : 'row'}
                        component='form'
                        ref={form}
                        onSubmit={sendEmail}
                        spacing={1}
                    >
                        <TextField
                            type='email'
                            required
                            name='user_email'
                            autoComplete='email'
                            fullWidth
                            placeholder='Nhập email'
                            label='Email'
                        />
                        <LoadingButton
                            sx={{
                                minWidth: {
                                    md: 150
                                }
                            }}
                            type='submit'
                            variant='contained'
                            endIcon={<Send />}
                            loading={isLoading}
                            size={isMatch ? 'small' : 'medium'}
                        >
                            Subscribe
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewLetters

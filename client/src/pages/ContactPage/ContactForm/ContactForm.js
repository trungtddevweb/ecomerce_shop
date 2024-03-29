import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, CardContent, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { toast } from 'react-toastify'

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useRef()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const sendEmail = e => {
        e.preventDefault()
        setIsLoading(true)
        toast
            .promise(emailjs.sendForm('service_v4tix23', 'template_nlr2obv', form.current, 'd1CBIhunT7-fyL3nu'), {
                pending: 'Đang gửi thư',
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
        <Box>
            <Grid>
                <Box padding={isMatch ? 0 : 4}>
                    <CardContent>
                        <Typography variant='caption' fontStyle='italic' color='gray'>
                            Lưu ý: Hãy điền đầy đủ thông tin dưới đây!
                        </Typography>
                        <Box component='form' marginTop={2} ref={form} onSubmit={sendEmail}>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        label='Họ'
                                        variant='outlined'
                                        name='user_fname'
                                        autoComplete='family-name'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        label='Tên '
                                        variant='outlined'
                                        name='user_lname'
                                        autoCapitalize='given-name'
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type='email'
                                        name='user_email'
                                        label='Email'
                                        variant='outlined'
                                        autoComplete='email'
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type='number'
                                        name='user_number'
                                        label='Số điện thoại'
                                        variant='outlined'
                                        autoComplete='tel'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Nội dung'
                                        multiline
                                        rows={4}
                                        name='user_message'
                                        variant='outlined'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} marginTop={2}>
                                    <LoadingButton
                                        loading={isLoading}
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        fullWidth
                                    >
                                        Gửi
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Box>
            </Grid>
        </Box>
    )
}

export default ContactForm

import emailjs from '@emailjs/browser'
import { Box, Button, CardContent, Grid, TextField, Typography } from '@mui/material'
import { useRef } from 'react'
import { toast } from 'react-toastify'

const ContactForm = () => {
    const form = useRef()

    const sendEmail = e => {
        e.preventDefault()
        toast.promise(emailjs.sendForm('service_v4tix23', 'template_nlr2obv', form.current, 'd1CBIhunT7-fyL3nu'), {
            pending: 'Đang gửi thư',
            success: 'Gửi thành công!!!',
            error: 'Gửi thất bại, hãy thử lại'
        })
        e.target.reset()
    }

    return (
        <Box className='register'>
            <Grid className='register-wrapper'>
                <Box padding={4}>
                    <CardContent>
                        <Typography variant='caption' fontStyle='italic' color='gray'>
                            Lưu ý: Hãy điền đầy đủ thông tin dưới đây!
                        </Typography>
                        <Box component='form' marginTop={2} ref={form} onSubmit={sendEmail}>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        placeholder='Nhập họ'
                                        label='Họ'
                                        variant='outlined'
                                        name='user_fname'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField
                                        placeholder='Nhập tên'
                                        label='Tên '
                                        variant='outlined'
                                        name='user_lname'
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type='email'
                                        placeholder='Enter email'
                                        name='user_email'
                                        label='Email'
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type='number'
                                        placeholder='Nhập số điện thoại'
                                        name='user_number'
                                        label='Số điện thoại'
                                        variant='outlined'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Nội dung'
                                        multiline
                                        rows={4}
                                        placeholder='Nhập lời nhắn...'
                                        name='user_message'
                                        variant='outlined'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} marginTop={2}>
                                    <Button type='submit' variant='contained' color='primary' fullWidth>
                                        Gửi
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* <Button sx={{
                            marginTop: 2,
                            textDecoration: "underline",
                        }}
                            component={Link} startIcon={<KeyboardReturnIcon />} to="/"> Trở về trang chủ</Button> */}
                    </CardContent>
                </Box>
            </Grid>
        </Box>
    )
}

export default ContactForm

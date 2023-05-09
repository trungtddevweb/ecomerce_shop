import {
    Button,
    Card,
    Box,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Checkbox,
    TextField,
    FormControlLabel,
    Grid
} from '@mui/material'
import { useState } from 'react'

const AddressForm = ({ onNext, onBack, isMatch }) => {
    const [info, setInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        email: '',
        city: '',
        zip: '',
        country: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleNextClick = e => {
        e.preventDefault()
        onNext(info)
    }

    return (
        <Card
            sx={{
                marginTop: '24px',
                width: {
                    md: '1000px'
                }
            }}
        >
            <CardHeader title='Địa chỉ nhận hàng' />
            <Divider component='div' variant='fullWidth' />
            <CardContent>
                <Box component='form' onSubmit={handleNextClick}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='fullName'
                                name='fullName'
                                label='Họ và tên'
                                fullWidth
                                autoComplete='given-name'
                                variant='standard'
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='phoneNumber'
                                name='phoneNumber'
                                label='Số điện thoại'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='tel'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address1'
                                name='address1'
                                label='Địa chỉ thường trú'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-line1'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='address2'
                                name='address2'
                                label='Địa chỉ hiện tại'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-line2'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='city'
                                name='city'
                                label='Thành phố'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-level2'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='email'
                                name='email'
                                type='email'
                                label='Địa chỉ email'
                                onChange={handleChange}
                                fullWidth
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='zip'
                                name='zip'
                                label='Mã Zip code'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping postal-code'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='country'
                                name='country'
                                label='Đất nước'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping country'
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
                                label='Sử dụng địa chỉ trên cho thanh toán lần sau'
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row'>
                            <Button onClick={onBack} variant='text'>
                                Trở lại
                            </Button>
                            <Button variant='contained' type='submit'>
                                Tiếp tục
                            </Button>
                        </Stack>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AddressForm

import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    TextField,
    Grid,
    Box,
    CardHeader,
    Divider,
    CardContent,
    Stack,
    Tab,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from 'src/utils/format'

const PaymentForm = ({ onNext, onBack }) => {
    const [value, setValue] = useState('credit')
    const [form, setForm] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
        focused: ''
    })

    const handleInputFocus = ({ target }) => {
        setForm(prev => ({ ...prev, focus: target.name }))
    }

    const handleChangeValues = ({ target }) => {
        if (target.name === 'cardNumber') {
            target.value = formatCreditCardNumber(target.value)
        } else if (target.name === 'expDate') {
            target.value = formatExpirationDate(target.value)
        } else if (target.name === 'cvv') {
            target.value = formatCVC(target.value)
        }

        setForm(prev => ({ ...prev, [target.name]: target.value }))
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleNextClick = e => {
        e.preventDefault()
        if (value === 'credit') {
            onNext(form)
        } else {
            onNext('cash')
        }
    }

    return (
        <Card
            sx={{
                marginTop: '24px',
                width: '1000px'
            }}
        >
            <CardHeader title='Phương thức thanh toán' />
            <Divider component='div' variant='fullWidth' />
            <CardContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label='lab API tabs example'>
                                <Tab label='Bằng thẻ tín dụng' value='credit' />
                                <Tab label='Tiền mặt' value='cash' />
                            </TabList>
                        </Box>
                        <TabPanel value='credit'>
                            <Box component='form' onSubmit={handleNextClick}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            type='text'
                                            id='cardName'
                                            name='cardName'
                                            label='Tên chủ tài khoản'
                                            fullWidth
                                            onChange={handleChangeValues}
                                            onFocus={handleInputFocus}
                                            autoComplete='cc-name'
                                            variant='standard'
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            type='tel'
                                            id='cardNumber'
                                            name='cardNumber'
                                            pattern='[\d| ]{16,22}'
                                            onChange={handleChangeValues}
                                            onFocus={handleInputFocus}
                                            label='Số tài khoản'
                                            fullWidth
                                            autoComplete='cc-number'
                                            variant='standard'
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            id='expDate'
                                            name='expDate'
                                            pattern='\d\d/\d\d'
                                            onChange={handleChangeValues}
                                            onFocus={handleInputFocus}
                                            label='Ngày hết hạn'
                                            fullWidth
                                            autoComplete='cc-exp'
                                            variant='standard'
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            id='cvv'
                                            name='cvv'
                                            label='Số CVV'
                                            pattern='\d{3,4}'
                                            helperText='Last three digits on signature strip'
                                            fullWidth
                                            onChange={handleChangeValues}
                                            onFocus={handleInputFocus}
                                            autoComplete='cc-csc'
                                            variant='standard'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color='secondary' name='saveCard' value='yes' />}
                                            label='Nhớ chi tiết thẻ tín dụng cho lần sau'
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value='cash'>
                            <Typography
                                sx={{
                                    minHeight: '220px'
                                }}
                            >
                                Thanh toán bằng tiền mặt khi nhận hàng
                            </Typography>
                        </TabPanel>
                    </TabContext>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Stack direction='row'>
                            <Button onClick={onBack} variant='text'>
                                Trở lại
                            </Button>
                            <Button variant='contained' onClick={handleNextClick} type='submit'>
                                Tiếp tục
                            </Button>
                        </Stack>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PaymentForm

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

const PaymentForm = ({ onNext, onBack }) => {
    const [value, setValue] = useState('1')
    const [choose, setChoose] = useState('card')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleNextClick = () => {
        onNext()
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
                                <Tab label='Bằng thẻ tín dụng' value='1' />
                                <Tab label='Tiền mặt' value='2' />
                            </TabList>
                        </Box>
                        <TabPanel value='1'>
                            <Box component='form' onSubmit={handleNextClick}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            id='cardName'
                                            label='Tên chủ tài khoản'
                                            fullWidth
                                            autoComplete='cc-name'
                                            variant='standard'
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            id='cardNumber'
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
                                            label='Số CVV'
                                            helperText='Last three digits on signature strip'
                                            fullWidth
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
                        <TabPanel value='2'>
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

export default PaymentForm

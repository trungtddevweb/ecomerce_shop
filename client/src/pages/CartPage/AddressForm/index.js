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
    Grid,
    Autocomplete,
    Typography
} from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AddressForm = ({ onNext, onBack, isMatch }) => {
    const [info, setInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        country: 'Việt Nam',
        province: '',
        district: '',
        ward: ''
    })
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const getAddressValue = () => {
        const { province, district, ward } = info
        return `${province}, ${district}, ${ward}`
    }

    useEffect(() => {
        const getProvinces = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/p/')
                setProvinces(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        const getDistricts = async () => {
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/`)
                setDistricts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        const getWards = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/w/')
                setWards(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProvinces()
        getDistricts()
        getWards()
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setInfo(prev => ({ ...prev, [name]: value }))
        console.log(setInfo(prev => ({ ...prev, [name]: value })))
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
                    md: '96vw',
                    xl: 1000
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
                        {/* <Grid item xs={12}>
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
                        </Grid> */}
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id='address1'
                                    name='address1'
                                    label='Địa chỉ thường trú'
                                    onFocus={handleFocus}
                                    fullWidth
                                    onChange={handleChange}
                                    autoComplete='shipping address-line1'
                                    variant='standard'
                                    value={getAddressValue()}
                                />
                            </Grid>
                            {isFocused && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            id='province'
                                            freeSolo
                                            name='province'
                                            options={provinces.map(option => option.name)}
                                            renderInput={params => (
                                                <TextField {...params} variant='standard' label='Thành phố/Tỉnh' />
                                            )}
                                            onChange={(e, value) => {
                                                const updatedValue = { target: { name: 'province', value } }
                                                handleChange(updatedValue)
                                            }}
                                            value={info.province}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            id='district'
                                            name='district'
                                            freeSolo
                                            options={districts.map(option => option.name)}
                                            renderInput={params => (
                                                <TextField {...params} variant='standard' label='Quận/Huyện' />
                                            )}
                                            onChange={(e, value) => {
                                                const updatedValue = { target: { name: 'district', value } }
                                                handleChange(updatedValue)
                                            }}
                                            value={info.district}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            id='ward'
                                            name='ward'
                                            freeSolo
                                            options={wards.map(option => option.name)}
                                            renderInput={params => (
                                                <TextField {...params} variant='standard' label='Thị xã' />
                                            )}
                                            onChange={(e, value) => {
                                                const updatedValue = { target: { name: 'ward', value } }
                                                handleChange(updatedValue)
                                            }}
                                            value={info.ward}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address2'
                                name='address2'
                                label='Địa chỉ nhận hàng'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-line1'
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
                                value={info.country}
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

                    {/* <Box>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address1'
                                name='address1'
                                label='Địa chỉ thường trú'
                                onFocus={handleFocus}
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-line1'
                                variant='standard'
                                value={`${info.province}, ${info.district}, ${info.ward}`}
                            />
                        </Grid>
                        {isFocused && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        id='free-solo-demo'
                                        freeSolo
                                        name='province'
                                        options={provinces.map(option => option.name)}
                                        renderInput={params => (
                                            <TextField {...params} variant='standard' label='Thành phố/Tỉnh' />
                                        )}
                                        onChange={(e, value) => handleChange('province', value)}
                                        value={info.province}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        id='free-solo-demo'
                                        freeSolo
                                        options={districts.map(option => option.name)}
                                        renderInput={params => (
                                            <TextField {...params} variant='standard' label='Quận/Huyện' />
                                        )}
                                        onChange={(e, value) => handleChange('district', value)}
                                        value={info.district}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        id='free-solo-demo'
                                        freeSolo
                                        options={wards.map(option => option.name)}
                                        renderInput={params => (
                                            <TextField {...params} variant='standard' label='Thị xã' />
                                        )}
                                        onChange={(e, value) => handleChange('ward', value)}
                                        value={info.ward}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box> */}

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

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
    Autocomplete
} from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { getDistrictsAPI, getLocationAPI, getWardsAPI } from '~/api/main'

const AddressForm = ({ onNext, onBack, isMatch }) => {
    const [provinces, setProvinces] = useState([])
    const [selectedProvinces, setSelectedProvinces] = useState(null)
    const [districts, setDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [selectedWard, setSelectedWard] = useState(null)
    const [wards, setWards] = useState([])
    const [info, setInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    })

    const getLocation = () => {
        return { selectedProvinces, selectedDistrict, selectedWard }
    }
    const location = getLocation()

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await getLocationAPI()
                setProvinces(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchLocation()
    }, [])

    // Handlers
    const handleProvinceChange = (event, newValue) => {
        setSelectedProvinces(newValue?.name)
        setSelectedDistrict(null)
        setSelectedWard(null)
        if (newValue) {
            const fetchDistricts = async () => {
                try {
                    const response = await getDistrictsAPI(newValue.code)
                    setDistricts(response.data.districts)
                } catch (error) {
                    console.error(error)
                }
            }
            fetchDistricts()
        } else {
            setDistricts([])
        }
    }

    const handleDistrictChange = (event, newValue) => {
        setSelectedDistrict(newValue?.name)
        setSelectedWard(null)
        if (newValue) {
            const getWards = async () => {
                try {
                    const response = await getWardsAPI(newValue.code)
                    setWards(response.data.wards)
                } catch (error) {
                    console.error(error)
                }
            }
            getWards()
        } else {
            setWards([])
        }
    }

    const handleWardChange = (event, newValue) => {
        setSelectedWard(newValue?.name)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleNextClick = e => {
        e.preventDefault()
        const payload = {
            ...info,
            location
        }
        onNext(payload)
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

                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                options={provinces}
                                name='province'
                                getOptionLabel={option => option.name}
                                onChange={handleProvinceChange}
                                renderInput={params => (
                                    <TextField {...params} label='Tỉnh/Thành phố' variant='standard' />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                name='district'
                                getOptionLabel={option => option.name}
                                options={districts.map(option => option)}
                                onChange={handleDistrictChange}
                                renderInput={params => <TextField {...params} variant='standard' label='Quận/Huyện' />}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                name='ward'
                                getOptionLabel={option => option.name}
                                options={wards.map(option => option)}
                                onChange={handleWardChange}
                                renderInput={params => <TextField {...params} variant='standard' label='Thị xã' />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address'
                                name='address'
                                label='Địa chỉ cụ thể'
                                fullWidth
                                onChange={handleChange}
                                autoComplete='shipping address-line1'
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

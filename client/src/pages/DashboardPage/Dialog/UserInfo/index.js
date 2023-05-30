import { Box, Stack, Typography } from '@mui/material'

const UserInfo = ({ info }) => {
    const { shippingAddress, location } = info
    return (
        <Box>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Họ tên:{' '}
                </Typography>
                <Typography fontWeight={600}>{shippingAddress.fullName}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Địa chỉ nhận hàng:{' '}
                </Typography>
                <Typography fontWeight={600}>{shippingAddress.address}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Số điện thoại:{' '}
                </Typography>
                <Typography fontWeight={600}>{shippingAddress.phone}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Thành phố:{' '}
                </Typography>
                <Typography fontWeight={600}>{location?.selectedProvinces}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Quận/Huyện:{' '}
                </Typography>
                <Typography fontWeight={600}>{location?.selectedDistrict}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Thị xã:{' '}
                </Typography>
                <Typography fontWeight={600}>{location?.selectedWard}</Typography>
            </Stack>
        </Box>
    )
}

export default UserInfo

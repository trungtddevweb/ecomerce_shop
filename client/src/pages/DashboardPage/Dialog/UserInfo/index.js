import { Box, Stack, Typography } from '@mui/material'

const UserInfo = ({ info }) => {
    const { shippingAddress } = info
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
                <Typography>{shippingAddress.fullName}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Địa chỉ:{' '}
                </Typography>
                <Typography>{shippingAddress.address}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Số điện thoại:{' '}
                </Typography>
                <Typography>{shippingAddress.phone}</Typography>
            </Stack>
        </Box>
    )
}

export default UserInfo
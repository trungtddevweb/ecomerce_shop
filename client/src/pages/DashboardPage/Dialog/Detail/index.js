import { Box, Stack, Typography } from '@mui/material'
import { convertStatus } from 'src/utils/const'
import { formatDate } from 'src/utils/format'

const Detail = ({ info }) => {
    return (
        <Box>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Mã đơn hàng:{' '}
                </Typography>
                <Typography>{info.orderCode}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Ngày đặt:{' '}
                </Typography>
                <Typography>{formatDate(info.createdAt)}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    PT thanh toán:{' '}
                </Typography>
                <Typography>{info.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ Visa/Banking'}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
                <Typography
                    sx={{
                        minWidth: '100px'
                    }}
                >
                    Trạng thái:{' '}
                </Typography>
                <Typography>{convertStatus(info.status)}</Typography>
            </Stack>
        </Box>
    )
}

export default Detail

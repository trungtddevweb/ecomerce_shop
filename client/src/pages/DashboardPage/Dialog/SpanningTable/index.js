import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { formatPrice } from 'src/utils/format'

const SpanningTable = ({ rows }) => {
    const { products } = rows
    const sumPrice = rows.totalPrice - (rows?.discount || 0) + (rows?.shipping || 0)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='spanning table'>
                <TableHead sx={{ bgcolor: 'lightgreen' }}>
                    <TableRow>
                        <TableCell colSpan={2}>Tên hàng</TableCell>
                        <TableCell align='center'>Màu sắc</TableCell>
                        <TableCell align='center'>Số lượng</TableCell>
                        <TableCell align='center'>Kích thước</TableCell>
                        <TableCell align='right'>Đơn giá</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(row => (
                        <TableRow key={row._id}>
                            <TableCell
                                sx={{
                                    maxWidth: '150px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}
                                colSpan={2}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align='center'>{row.color}</TableCell>
                            <TableCell align='center'>{row.quantity}</TableCell>
                            <TableCell align='center'>{row.size.toUpperCase()}</TableCell>
                            <TableCell align='right'>{row.price.toLocaleString('vi-VN')}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={4}>Tạm tính</TableCell>
                        <TableCell align='right'>{rows.totalPrice.toLocaleString('vi-VN')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4}>Tiền ship</TableCell>
                        <TableCell align='right'>1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4}>Mã giảm giá</TableCell>
                        <TableCell align='right'>- {formatPrice(rows.discount)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4}>Tổng thanh toán</TableCell>
                        <TableCell align='right'>{formatPrice(sumPrice < 0 ? 0 : sumPrice)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SpanningTable

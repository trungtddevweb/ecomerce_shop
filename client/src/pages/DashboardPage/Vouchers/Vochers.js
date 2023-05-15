import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllVouchers } from '~/api/main'
import { optionsVouchers } from 'src/utils/const'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material'

const Vouchers = () => {
    const token = useSelector(state => state.auth.user?.token)
    const [vouchers, setVouchers] = useState([])
    console.log(vouchers)
    useEffect(() => {
        const getAllVoucher = async () => {
            try {
                const res = await getAllVouchers(optionsVouchers.limit, optionsVouchers.page, token)
                console.log(res.docs)
                setVouchers(res.docs)
            } catch (err) {
                console.log(err)
            }
        }
        getAllVoucher()
    }, [token])

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã Voucher</TableCell>
                            <TableCell>Giảm giá</TableCell>
                            <TableCell>Tổng số</TableCell>
                            <TableCell>Đã sử dụng</TableCell>
                            <TableCell>Ngày hết hạn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((voucher, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{voucher.voucherCode}</TableCell>
                                    <TableCell>{voucher.discount}</TableCell>
                                    <TableCell>{voucher.total}</TableCell>
                                    <TableCell>{voucher.used}</TableCell>
                                    <TableCell>{voucher.expirationDate?.split('T')[0]}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Vouchers

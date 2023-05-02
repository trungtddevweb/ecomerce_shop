import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { getOrderByUserIdAPI } from '~/api/main'
import { useSelector } from 'react-redux'
import { Chip, TableHead, styled } from '@mui/material'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { useLayoutEffect } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}))

function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange, data } = props

    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    )
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
}

export default function CustomPaginationActionsTable() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [data, setData] = useState(null)

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth?.user.token)

    useLayoutEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true)
                const listOrder = await getOrderByUserIdAPI(token, rowsPerPage, page + 1)
                setLoading(false)
                setData(listOrder.data)
                setOrders(listOrder.data.docs)
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
        }
        fetchOrder()
    }, [token, page, rowsPerPage])

    const columns = [
        { id: 'orderCode', label: 'Mã đơn hàng', minWidth: 100 },
        { id: 'orderedDate', label: 'Ngày đặt hàng', minWidth: 120 },
        {
            id: 'paymentMethod',
            label: 'Phương thức',
            minWidth: 120
        },
        {
            id: 'totalPrice',
            label: 'Giá trị ',
            minWidth: 100
        },
        {
            id: 'isPaid',
            label: 'Thanh toán',
            minWidth: 120
        },
        {
            id: 'status',
            label: 'Trạng thái'
        }
    ]

    // Avoid a layout jump when reaching the last page with empty rows.
    const count = data?.totalDocs
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
                <TableHead>
                    <StyledTableRow>
                        {columns.map(column => (
                            <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                {loading ? (
                    <StyledTableCell colSpan={6}>
                        <LinearIndeterminate />
                    </StyledTableCell>
                ) : (
                    <TableBody>
                        {orders.map(row => (
                            <StyledTableRow key={row.orderedDate}>
                                <TableCell component='th' scope='row'>
                                    {row.orderCode}
                                </TableCell>
                                <TableCell>{row?.orderedDate.split('T')[0]}</TableCell>
                                <TableCell>{row.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ tín dụng/Visa'}</TableCell>
                                <TableCell>{row.totalPrice.toLocaleString('vi-VN')}</TableCell>
                                <TableCell>
                                    <Chip
                                        size='small'
                                        label={row.isPaid === true ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                        color={row.isPaid ? 'success' : 'warning'}
                                    />
                                </TableCell>
                                <TableCell>{row.status === 'pending' ? 'Đang vận chuyển' : 'Thành công'}</TableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={6} />
                            </StyledTableRow>
                        )}
                    </TableBody>
                )}

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={6}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page'
                                },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            data={data}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

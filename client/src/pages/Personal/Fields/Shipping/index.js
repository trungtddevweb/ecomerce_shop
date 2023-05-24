import { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    tableCellClasses,
    Chip,
    Menu,
    MenuItem,
    Stack,
    TableHead,
    Typography,
    styled
} from '@mui/material'
import { cancelOrderAPI, getOrderByUserIdAPI } from '~/api/main'
import { useDispatch, useSelector } from 'react-redux'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { convertStatus, statusShipping } from 'src/utils/const'
import { formatDate } from 'src/utils/format'
import {
    Edit,
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
    MoreVert,
    Visibility
} from '@mui/icons-material'
import useToggle from '~/hooks/useToggle'
import ModalShipping from './ModalShipping'
import { showDialog } from 'src/redux/slice/dialogSlice'
import { showToast } from 'src/redux/slice/toastSlice'

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
    const { count, page, rowsPerPage, onPageChange } = props

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
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
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
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
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
    const token = useSelector(state => state.auth.user?.token)
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useToggle(false)
    const [dataField, setDataField] = useState(null)
    const dispatch = useDispatch()
    const [isPending, setIsPending] = useState(true)

    const handleClickRow = (event, row) => {
        setAnchorEl(event.currentTarget)
        setDataField(row)
    }

    const handleClose = row => {
        setAnchorEl(null)
        setDataField('')
    }

    const handleViewRow = () => {
        setOpen()
        setAnchorEl(null)
    }

    const handleConfirm = async () => {
        try {
            setIsPending(true)
            const res = await cancelOrderAPI(dataField.orderCode, token)
            if (res.status === 200) {
                dispatch(showToast({ type: 'success', message: 'Hủy đơn hàng thành công!' }))
                setIsPending(false)
                handleClose()
            }
        } catch (error) {
            setIsPending(false)
            console.error(error)
            dispatch(showToast({ type: 'error', message: `${error.response.data.message}` }))
        }
    }

    const handleCancel = () => {
        dispatch(
            showDialog({
                title: 'Hủy đơn hàng',
                message: `Bạn có chắc muốn hủy đơn hàng này chứ (Chú ý với đơn hàng đã thanh toán không thể hủy, hãy liên lạc với bên chăm sóc khách hàng để được hỗ trợ hủy và hoàn tiền)`,
                onConfirm: handleConfirm
            })
        )
        handleClose()
    }

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
    }, [token, page, rowsPerPage, isPending])

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
        },
        {
            id: 'tool',
            label: ''
        }
    ]

    // Avoid a layout jump when reaching the last page with empty rows.
    const count = data?.totalDocs || 0
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
                    <TableBody>
                        <TableRow>
                            <StyledTableCell colSpan={7}>
                                <LinearIndeterminate />
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {orders.map(row => (
                            <StyledTableRow key={row.orderedDate}>
                                <TableCell component='th' scope='row'>
                                    {row.orderCode}
                                </TableCell>
                                <TableCell>{formatDate(row.orderedDate)}</TableCell>
                                <TableCell>{row.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ tín dụng/Visa'}</TableCell>
                                <TableCell>
                                    {row.totalPrice - row.discount < 0
                                        ? '0'
                                        : (row.totalPrice - row.discount).toLocaleString('vi-VN')}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        size='small'
                                        label={row.isPaid === true ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                        color={row.isPaid ? 'success' : 'warning'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        size='small'
                                        label={convertStatus(row.status)}
                                        color={
                                            row.status === 'prepare'
                                                ? 'default'
                                                : row.status === 'pending'
                                                ? 'warning'
                                                : row.status === 'delivering'
                                                ? 'info'
                                                : row.status === 'delivered'
                                                ? 'success'
                                                : 'error'
                                        }
                                    />
                                </TableCell>
                                <TableCell
                                    onClick={e => handleClickRow(e, row)}
                                    sx={{
                                        width: '80px',
                                        cursor: 'pointer'
                                    }}
                                    align='right'
                                >
                                    <MoreVert />
                                </TableCell>
                                <Menu
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                >
                                    <MenuItem onClick={handleViewRow}>
                                        <Stack direction='row' spacing={1}>
                                            <Visibility />
                                            <Typography>Chi tiết</Typography>
                                        </Stack>
                                    </MenuItem>
                                    {dataField && dataField.status !== 'cancel' && (
                                        <MenuItem onClick={handleCancel}>
                                            <Stack direction='row' spacing={1}>
                                                <Edit />
                                                <Typography>Hủy đơn</Typography>
                                            </Stack>
                                        </MenuItem>
                                    )}
                                </Menu>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={7} />
                            </StyledTableRow>
                        )}
                        {open && (
                            <ModalShipping
                                title='Thông tin đơn hàng'
                                open={open}
                                handleClose={setOpen}
                                data={dataField}
                            />
                        )}
                    </TableBody>
                )}

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10]}
                            colSpan={7}
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

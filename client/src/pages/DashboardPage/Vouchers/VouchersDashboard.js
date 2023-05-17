import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import EnhancedTableHead from '~/components/EnhancedTableHead'
import { Chip, TablePagination, TableRow, Typography } from '@mui/material'
import EnhancedTableToolbar from '~/components/EnhancedTableToolbar'
import withFallback from 'src/hoc/withFallback'
import ErrorFallback from 'src/fallback/Error'
import LinearIndeterminate from 'src/fallback/LinearProgress'
import { getAllVouchersAPI } from '~/api/main'
import Image from '~/components/Image/Image'
import images from '~/assets/imgs'
import { useSelector } from 'react-redux'
import { formatDate } from 'src/utils/format'

const VouchersDashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(true)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('total')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [vouchers, setVouchers] = useState([])
    const [data, setData] = useState(null)
    const token = useSelector(state => state.auth.user?.token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllVouchersAPI(rowsPerPage, page + 1, token)
                setVouchers(response.docs)
                setData(response)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchData()
    }, [rowsPerPage, page, isDeleting, token])

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) {
                return order
            }
            return a[1] - b[1]
        })
        return stabilizedThis.map(el => el[0])
    }
    const headCells = [
        {
            id: 'voucherCode',
            numeric: false,
            disablePadding: true,
            label: 'Mã voucher'
        },
        {
            id: 'discount',
            numeric: true,
            disablePadding: false,
            label: 'Giá giảm'
        },
        {
            id: 'startTime',
            numeric: true,
            disablePadding: false,
            label: 'Bắt đầu'
        },
        {
            id: 'endTime',
            numeric: true,
            disablePadding: false,
            label: 'Kết thúc'
        },
        {
            id: 'total',
            numeric: true,
            disablePadding: false,
            label: 'Số lượng'
        },
        {
            id: 'used',
            numeric: true,
            disablePadding: false,
            label: 'Đã dùng'
        },
        {
            id: 'status',
            numeric: true,
            disablePadding: false,
            label: 'Trạng thái'
        }
    ]

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = e => {
        if (e.target.checked) {
            const checkedList = vouchers?.map(voucher => voucher._id)
            setSelected(checkedList)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setIsLoading(true)
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = event => {
        setDense(event.target.checked)
    }

    const isSelected = id => selected.includes(id)
    const count = data?.totalDocs || 0
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    selectedItem={selected}
                    setDeleting={setIsDeleting}
                    setSelected={setSelected}
                />
                {isLoading ? (
                    <LinearIndeterminate />
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
                            <EnhancedTableHead
                                page={page}
                                headCells={headCells}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={vouchers?.length}
                            />

                            <TableBody>
                                {stableSort(vouchers, getComparator(order, orderBy)).map((row, index) => {
                                    const isItemSelected = isSelected(row._id)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    onClick={event => handleClick(event, row._id)}
                                                    color='primary'
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '120px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                {row.voucherCode}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                align='right'
                                            >
                                                {row.discount.toLocaleString('vi-VN')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '160px'
                                                }}
                                                align='right'
                                            >
                                                {formatDate(row.startTime)}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '120px'
                                                }}
                                                align='right'
                                            >
                                                {formatDate(row.endTime)}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '120px'
                                                }}
                                                align='right'
                                            >
                                                {row.total}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '120px'
                                                }}
                                                align='right'
                                            >
                                                {row.used}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '125px'
                                                }}
                                                align='right'
                                            >
                                                <Chip
                                                    size='small'
                                                    label={
                                                        row.used !== row.total || row.expired ? 'Khả dụng' : 'Hết mã'
                                                    }
                                                    color={
                                                        row.used !== row.total || row.expired ? 'success' : 'default'
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {vouchers.length === 0 && (
                            <Box
                                margin='auto'
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                marginTop='20px'
                            >
                                <Typography variant='inherit'>Danh sách rỗng</Typography>
                                <Image className='w-25' src={images.emptyFolder} alt='Null' />
                            </Box>
                        )}
                    </TableContainer>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default withFallback(VouchersDashboard, ErrorFallback, LinearIndeterminate)

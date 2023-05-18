import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { getAllOrdersAPI } from '~/api/main'
import EnhancedTableHead from '~/components/EnhancedTableHead/EnhancedTableHead'
import { Chip, Menu, MenuItem, TablePagination, TableRow, Typography } from '@mui/material'
import EnhancedTableToolbar from '~/components/EnhancedTableToolbar'
import withFallback from 'src/hoc/withFallback'
import ErrorFallback from 'src/fallback/Error'
import LinearIndeterminate from 'src/fallback/LinearProgress'
import Image from '~/components/Image'
import images from '~/assets/imgs'
import { formatDate } from 'src/utils/format'
import { useSelector } from 'react-redux'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

const OrdersDashboard = ({ dataModal, onEdit }) => {
    const [data, setData] = useState(null)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(true)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const token = useSelector(state => state.auth.user.token)

    // const [anchorEl, setAnchorEl] = useState(null)

    // const handleClickRow = event => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    function convertStatus(status) {
        switch (status) {
            case 'prepare':
                return 'Chuẩn bị'
            case 'pending':
                return 'Đang xử lý'
            case 'delivering':
                return 'Đang giao'
            case 'delivered':
                return 'Đã giao'
            case 'cancel':
                return 'Đã huỷ'
            default:
                return 'Chuẩn bị'
        }
    }

    // End modal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOrdersAPI(rowsPerPage, page + 1, token)
                setData(response)
                setProducts(response.docs)
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
            id: 'orderCode',
            numeric: false,
            disablePadding: true,
            label: 'Mã đơn hàng'
        },
        {
            id: 'userId',
            numeric: false,
            disablePadding: false,
            label: 'UserId'
        },
        {
            id: 'price',
            numeric: false,
            disablePadding: false,
            label: 'Giá trị'
        },
        {
            id: 'voucherCode',
            numeric: false,
            disablePadding: false,
            label: 'Voucher'
        },

        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Trạng thái'
        },

        {
            id: 'orderedDate',
            numeric: false,
            disablePadding: false,
            label: 'Ngày dặt'
        },
        {
            id: 'isPaid',
            numeric: false,
            disablePadding: false,
            label: 'Thanh toán'
        }
    ]

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = products?.map(n => n._id)
            setSelected(newSelected)
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

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const isSelected = name => selected.includes(name)
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
                        <Table
                            style={{ cursor: 'context-menu' }}
                            sx={{ minWidth: 750 }}
                            aria-labelledby='tableTitle'
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                page={page}
                                headCells={headCells}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={products?.length}
                            />
                            <TableBody>
                                {stableSort(products, getComparator(order, orderBy)).map((row, index) => {
                                    const isItemSelected = isSelected(row._id)
                                    const labelId = `enhanced-table-checkbox-${index}`
                                    return (
                                        <TableRow
                                            // onClick={handleClickRow}
                                            {...bindTrigger(popupState)}
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
                                                    minWidth: '115px'
                                                }}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                {row.orderCode}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '130px',
                                                    maxWidth: '130px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {row.userId}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                            >
                                                {row.totalPrice - row.discount < 0
                                                    ? '0'
                                                    : (row.totalPrice - row.discount).toLocaleString('vi-VN')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '120px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {row.voucherCode}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '130px'
                                                }}
                                            >
                                                <Chip
                                                    size='small'
                                                    label={convertStatus(row.status)}
                                                    color={
                                                        row.status === ('prepare' || 'cancel')
                                                            ? 'default'
                                                            : row.status === 'pending'
                                                            ? 'warning'
                                                            : row.status === 'delivering'
                                                            ? 'info'
                                                            : row.status === 'delivered'
                                                            ? 'success'
                                                            : undefined
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '120px'
                                                }}
                                            >
                                                {formatDate(row.createdAt)}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '110px'
                                                }}
                                            >
                                                <Chip
                                                    size='small'
                                                    label={row.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                    color={row.isPaid ? 'success' : 'warning'}
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
                                        <TableCell colSpan={7} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {/* <Menu keepMounted open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
                            <MenuItem onClick={handleClose}>Option 1</MenuItem>
                            <MenuItem onClick={handleClose}>Option 2</MenuItem>
                            <MenuItem onClick={handleClose}>Option 3</MenuItem>
                        </Menu> */}
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>Cake</MenuItem>
                            <MenuItem onClick={popupState.close}>Death</MenuItem>
                        </Menu>
                        {products.length === 0 && (
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
                    rowsPerPageOptions={[5, 10]}
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

export default withFallback(OrdersDashboard, ErrorFallback, LinearIndeterminate)

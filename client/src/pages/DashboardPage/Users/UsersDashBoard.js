import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import EnhancedTableHead from '~/components/EnhancedTableHead'
import { Avatar, Chip, Stack, TablePagination, TableRow, Typography } from '@mui/material'
import EnhancedTableToolbar from '~/components/EnhancedTableToolbar'
import withFallback from 'src/hoc/withFallback'
import ErrorFallback from 'src/fallback/Error'
import LinearIndeterminate from 'src/fallback/LinearProgress'
import { getAllUsers } from '~/api/main'
import { useSelector } from 'react-redux'
import Image from '~/components/Image/Image'
import images from '~/assets/imgs'
import { formatDate } from 'src/utils/format'

const UsersDashBoard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(true)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [data, setData] = useState(null)
    const [users, setUsers] = useState([])

    const token = useSelector(state => state.auth.user?.token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers(token, rowsPerPage, page + 1)
                setData(response)
                setUsers(response.docs)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsPerPage, page, isDeleting])

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
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Tên người dùng'
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email'
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: false,
            label: 'Số điện thoại'
        },
        {
            id: 'orderCount',
            numeric: false,
            disablePadding: false,
            label: 'Đã đặt'
        },
        {
            id: 'totalCancel',
            numeric: false,
            disablePadding: false,
            label: 'Đã hủy'
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Trạng thái'
        },
        {
            id: 'date',
            numeric: false,
            disablePadding: false,
            label: 'Ngày tạo'
        }
    ]

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = users?.map(n => n._id)
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

    const isSelected = id => selected.includes(id)
    const count = data?.totalDocs || 0
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    setSelected={setSelected}
                    numSelected={selected.length}
                    selectedItem={selected}
                    setDeleting={setIsDeleting}
                />
                {isLoading ? (
                    <LinearIndeterminate />
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
                            <EnhancedTableHead
                                headCells={headCells}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={count}
                            />
                            <TableBody>
                                {stableSort(users, getComparator(order, orderBy)).map((row, index) => {
                                    const isItemSelected = isSelected(row._id)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row._id)}
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    color='primary'
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '150px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                <Stack direction='row' alignItems='center' spacing={1}>
                                                    <Avatar src={row.picture} sx={{ width: 24, height: 24 }} />
                                                    <Typography variant='body2'>{row.name}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '150px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {row.email}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '150px'
                                                }}
                                            >
                                                {row.phone ? row.phone : 'Chưa cập nhập'}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: '120px'
                                                }}
                                            >
                                                {row.ordersCount?.length || 0}
                                            </TableCell>
                                            <TableCell>{row?.totalCancel}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    size='small'
                                                    label={row.isActive ? 'Hoạt động' : 'Khóa'}
                                                    color={row.isPaid ? 'success' : 'warning'}
                                                />
                                            </TableCell>
                                            <TableCell>{formatDate(row.createdAt)}</TableCell>
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
                        {users.length === 0 && (
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

export default withFallback(UsersDashBoard, ErrorFallback, LinearIndeterminate)

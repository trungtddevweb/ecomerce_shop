import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { getAllProducts } from '~/api/main'
import EnhancedTableHead from '~/components/EnhancedTableHead/EnhancedTableHead'
import { IconButton, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import EnhancedTableToolbar from '~/components/EnhancedTableToolbar'
import withFallback from 'src/hoc/withFallback'
import ErrorFallback from 'src/fallback/Error'
import LinearIndeterminate from 'src/fallback/LinearProgress'
import { Edit } from '@mui/icons-material'
import Image from '~/components/Image/Image'
import images from '~/assets/imgs'
import EditModal from '~/components/EditModal/EditModal'

const ProductsDashboard = ({ dataModal, onEdit }) => {
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
    // Modal
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    const handleModalOpen = data => {
        setModalData(data)
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setModalData(null)
    }

    const handleModalSave = value => {
        onEdit(modalData.id, value)
    }
    // End modal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProducts(rowsPerPage, page + 1)
                setData(response)
                setProducts(response.docs)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchData()
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
            label: 'Tên sản phẩm'
        },
        {
            id: 'quantity',
            numeric: true,
            disablePadding: false,
            label: 'Số lượng'
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Giá(VNĐ)'
        },
        {
            id: 'category',
            numeric: true,
            disablePadding: false,
            label: 'Loại(Tag)'
        },
        {
            id: 'date',
            numeric: true,
            disablePadding: false,
            label: 'Ngày đăng'
        },
        {
            id: 'settings',
            numeric: true,
            disablePadding: false,
            label: 'Chỉnh sửa'
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
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
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
                                                    maxWidth: '200px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell sx={{ min: '80px' }} align='right'>
                                                {row.quantity?.toLocaleString('vi-VN')}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '100px'
                                                }}
                                                align='right'
                                            >
                                                {row.price?.toLocaleString('vi-VN')}
                                            </TableCell>
                                            <TableCell align='right'>{row.category}</TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: '150px'
                                                }}
                                                align='right'
                                            >
                                                {row.createdAt?.split('T')[0]}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    padding: '8px'
                                                }}
                                                align='right'
                                            >
                                                <Tooltip title='Sửa'>
                                                    <IconButton onClick={() => handleModalOpen(row)}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
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
                {modalData && (
                    <EditModal
                        open={modalOpen}
                        handleClose={handleModalClose}
                        handleSave={handleModalSave}
                        value={modalData.name}
                    />
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

export default withFallback(ProductsDashboard, ErrorFallback, LinearIndeterminate)

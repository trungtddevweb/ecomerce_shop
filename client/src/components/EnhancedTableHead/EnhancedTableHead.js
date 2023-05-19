// import PropTypes from 'react'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { Box, Checkbox, TableCell, TableHead, TableRow } from '@mui/material'

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, page } = props

    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow sx={{ bgcolor: 'lightseagreen' }}>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        hidden={page > 0}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

// EnhancedTableHead.propTypes = {
//     // numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

export default EnhancedTableHead

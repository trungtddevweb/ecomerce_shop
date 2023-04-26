// import PropTypes from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { deleteItemByParams } from '~/api/main'
import { showDialog } from 'src/redux/slice/dialogSlice'

function EnhancedTableToolbar(props) {
    const { managerId } = useParams()
    const { numSelected, selectedItem, setSelected, data, setData } = props
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)

    const handleDelete = async () => {
        try {
            await deleteItemByParams(managerId, token, selectedItem)
            dispatch(showToast({ type: 'success', message: 'Xóa thành công!' }))
        } catch (error) {
            console.error(error)
            dispatch(showToast({ type: 'error', message: `${error.message}` }))
        }
    }
    const handleClick = () => {
        dispatch(
            showDialog({
                title: 'Xóa các Items',
                message: `Bạn có chắc muốn xóa các mục này chứ này chứ`,
                onConfirm: handleDelete
            })
        )
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    {managerId === 'products' ? 'Sản phẩm' : managerId === 'users' ? 'Người dùng' : 'Bài viết'}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title='Xóa'>
                    <IconButton onClick={handleClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Tạo mới'>
                    <IconButton>
                        <Add />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

export default EnhancedTableToolbar

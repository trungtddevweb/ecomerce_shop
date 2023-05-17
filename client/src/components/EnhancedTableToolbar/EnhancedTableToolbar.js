// import PropTypes from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { deleteItemByParams, removeProductFromSaleAPI } from '~/api/main'
import { showDialog } from 'src/redux/slice/dialogSlice'

function EnhancedTableToolbar(props) {
    const { managerId } = useParams()
    const { numSelected, selectedItem, setSelected, setDeleting } = props
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user?.token)

    const getTitleToolbar = title => {
        switch (title) {
            case 'users':
                return 'Nguời dùng'
            case 'blogs':
                return 'Bài viết'
            case 'products':
                return 'Sản phẩm'
            case 'vouchers':
                return 'Mã khuyến mãi'
            case 'orders':
                return 'Đơn hàng'
            case 'products-sale':
                return 'Sản phẩm sale'
            default:
                return 'Bài viết'
        }
    }

    const handleDelete = async () => {
        try {
            setDeleting(true)
            const res =
                managerId !== 'products-sale'
                    ? await deleteItemByParams(managerId, token, selectedItem)
                    : await removeProductFromSaleAPI(managerId, token, selectedItem)
            if (res.status === 200) {
                setSelected([])
                dispatch(showToast({ type: 'success', message: 'Xóa thành công!' }))
                setDeleting(false)
            }
        } catch (error) {
            setDeleting(false)
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
                    {getTitleToolbar(managerId)}
                </Typography>
            )}

            {numSelected > 0 && (
                <IconButton onClick={handleClick}>
                    <Tooltip title='Xóa'>
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            )}
        </Toolbar>
    )
}

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

export default EnhancedTableToolbar

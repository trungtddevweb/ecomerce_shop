// import PropTypes from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from 'src/redux/slice/toastSlice'
import { deleteItemByParams } from '~/api/main'
import { useState } from 'react'
import CustomBackDrop from '../BackDrop/CustomBackDrop'
import axios from 'axios'

function EnhancedTableToolbar(props) {
    const [isLoading, setIsLoading] = useState(false)
    const { managerId } = useParams()
    const { numSelected, selectedItem } = props;
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.token)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            // await deleteItemByParams(managerId, token, selectedItem)
            await axios.delete(`http://localhost:5000/api/${managerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    selectedIds: selectedItem
                }
            })
            setIsLoading(false)
            dispatch(showToast({ type: 'success', message: 'Xóa thành công!' }))
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            dispatch(showToast({ type: "error", message: `${error.message}` }))
        }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {managerId === "products" ? "Sản phẩm" : managerId === "users" ? "Người dùng" : "Bài viết"}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Xóa">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Tạo mới">
                    <IconButton>
                        <Add />
                    </IconButton>
                </Tooltip>
            )}
            <CustomBackDrop open={isLoading} />
        </Toolbar>
    );
}

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

export default EnhancedTableToolbar
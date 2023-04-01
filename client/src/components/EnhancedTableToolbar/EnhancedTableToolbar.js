// import PropTypes from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Add } from '@mui/icons-material'

function EnhancedTableToolbar(props) {
    const { managerId } = useParams()
    const { numSelected } = props;

    const handleDelete = async (selected) => {
        console.log('Clicked')
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
        </Toolbar>
    );
}

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

export default EnhancedTableToolbar
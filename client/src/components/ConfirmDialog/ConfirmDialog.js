import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, DialogContentText } from '@mui/material'
import { hideDialog } from 'src/redux/slice/dialogSlice'

const ConfirmDialog = () => {
    const { open, title, message, onConfirm } = useSelector(state => state.dialog)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hideDialog())
    }

    const handleConfirm = () => {
        onConfirm()
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title' bgcolor='lightgray'>
                {title}
            </DialogTitle>
            <DialogContent
                sx={{
                    minHeight: '40px',
                    marginY: '20px',
                    md: {
                        minWidth: '400px'
                    }
                }}
            >
                <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
            </DialogContent>
            <Divider variant='fullWidth' component='div' />
            <DialogActions>
                <Button onClick={handleClose} variant='contained' color='error'>
                    Hủy
                </Button>
                <Button onClick={handleConfirm} variant='contained' color='primary'>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog

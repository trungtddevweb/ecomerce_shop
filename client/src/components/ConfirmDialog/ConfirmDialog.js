import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material'
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle bgcolor='lightGray'>{title}</DialogTitle>
            <DialogContent
                sx={{
                    minWidth: '400px',
                    minHeight: '40px',
                    marginY: '20px'
                }}
            >
                {message}
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

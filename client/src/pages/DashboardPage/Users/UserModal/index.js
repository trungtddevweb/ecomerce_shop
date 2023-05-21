import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'

const UserModal = ({ open, handleClose, data }) => {
    return (
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Cài đặt người dùng</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600}>Khách hàng</Typography>
                            {/* <UserInfo info={data} />{' '} */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600}>Chi tiết</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontWeight={600}>Đơn hàng</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
                <Button variant='contained' onClick={handleClose}>
                    Cập nhập
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UserModal

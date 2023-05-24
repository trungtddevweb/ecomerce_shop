import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material'
import Detail from '~/pages/DashboardPage/Dialog/Detail'
import SpanningTable from '~/pages/DashboardPage/Dialog/SpanningTable'
import UserInfo from '~/pages/DashboardPage/Dialog/UserInfo'

const ModalShipping = ({ open, handleClose, data }) => {
    return (
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
            <DialogTitle bgcolor='primary'>Thông tin đơn hàng</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600} color='primary'>
                                Khách hàng
                            </Typography>
                            <UserInfo info={data} />{' '}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography fontWeight={600} color='primary'>
                                Chi tiết
                            </Typography>
                            <Detail info={data} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontWeight={600} color='primary'>
                            Đơn hàng
                        </Typography>
                        <SpanningTable rows={data} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalShipping

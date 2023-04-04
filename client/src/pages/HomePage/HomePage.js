import { useEffect, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { showToast } from 'src/redux/slice/toastSlice'
import { makeStyles } from '@mui/styles'
import { Button, Modal, Typography } from '@mui/material'
import { useState } from 'react'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Sliders = lazy(() => import('~/components/Slider'))

const HomePage = () => {
    useDocumentTitle('Trang chủ')
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Sliders />
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Modal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <div className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        Modal Title
                    </Typography>
                    <Typography variant="body1">
                        Modal Content
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default HomePage

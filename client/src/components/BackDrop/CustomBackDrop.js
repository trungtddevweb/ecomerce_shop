import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function CustomBackDrop({ open, height }) {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                height: { height },
                zIndex: theme => theme.zIndex.drawer + 99_999_999
            }}
            open={open}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}

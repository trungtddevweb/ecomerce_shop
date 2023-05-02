import { Box, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import { lazy } from 'react'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import Settings from './Fields/Settings'
import Shipping from './Fields/Shipping'
import Inbox from './Fields/Inbox'
const TabsNavigation = lazy(() => import('./TabsNavigation'))

const OrderPage = () => {
    const [selected, setSelected] = useState('settings')
    useScrollToTop()
    useDocumentTitle('Thông tin cá nhân')

    function getSelectedField(field) {
        switch (field) {
            case 'settings':
                return <Settings />
            case 'shipping':
                return <Shipping />
            case 'inbox':
                return <Inbox />

            default:
                return <div>Error</div>
        }
    }

    return (
        <Box minHeight='71vh' display='flex' bgcolor='lightgray' justifyContent='center'>
            <Grid width={1400} marginY={5} container spacing={2}>
                <Grid item xs={4}>
                    <Paper elevation={6}>
                        <TabsNavigation selected={selected} setSelected={setSelected} />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={6}>{getSelectedField(selected)}</Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderPage

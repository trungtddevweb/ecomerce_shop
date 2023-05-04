import { ListSubheader, List, ListItemButton, ListItemText } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import InboxIcon from '@mui/icons-material/MoveToInbox'

import { Settings, LocalShipping } from '@mui/icons-material'

const TabsNavigation = ({ setSelected, selected }) => {
    const handleSelect = (event, value) => {
        setSelected(value)
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                    Thông tin cá nhân
                </ListSubheader>
            }
        >
            <ListItemButton selected={selected === 'settings'} onClick={e => handleSelect(e, 'settings')}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary='Cài đặt chung' />
            </ListItemButton>
            <ListItemButton selected={selected === 'shipping'} onClick={e => handleSelect(e, 'shipping')}>
                <ListItemIcon>
                    <LocalShipping />
                </ListItemIcon>
                <ListItemText primary='Đơn hàng của tôi' />
            </ListItemButton>
            <ListItemButton selected={selected === 'inbox'} onClick={e => handleSelect(e, 'inbox')}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Inbox' />
            </ListItemButton>
        </List>
    )
}

export default TabsNavigation

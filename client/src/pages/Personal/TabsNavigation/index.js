import { useState } from 'react'
import { ListSubheader, List, ListItemButton, ListItemText, useTheme, useMediaQuery, Tabs, Tab } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonIcon from '@mui/icons-material/Person'

import { LocalShipping, Person } from '@mui/icons-material'

const TabsNavigation = ({ setSelected, selected }) => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const handleSelect = (event, value) => {
        setSelected(value)
    }

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return isMatch ? (
        <Tabs value={value} onChange={handleChange} aria-label='icon tabs example'>
            <Tab
                label='Hồ sơ'
                icon={<Person />}
                aria-label='person'
                selected={selected === 'settings'}
                onClick={e => handleSelect(e, 'settings')}
            />
            <Tab
                label='Đơn hàng'
                icon={<LocalShipping />}
                aria-label='order'
                selected={selected === 'shipping'}
                onClick={e => handleSelect(e, 'shipping')}
            />
        </Tabs>
    ) : (
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
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Thông tin' />
            </ListItemButton>
            <ListItemButton selected={selected === 'shipping'} onClick={e => handleSelect(e, 'shipping')}>
                <ListItemIcon>
                    <LocalShipping />
                </ListItemIcon>
                <ListItemText primary='Đơn hàng của tôi' />
            </ListItemButton>
        </List>
    )
}

export default TabsNavigation

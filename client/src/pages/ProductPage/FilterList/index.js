import { useState } from 'react'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListSubheader,
    Collapse,
    Radio,
    Stack
} from '@mui/material'
import { pink } from '@mui/material/colors'
import { ExpandLess, ExpandMore, Inbox, StarBorder } from '@mui/icons-material'
import useToggle from '~/hooks/useToggle'
import RadioGroup from '~/components/RadioGroup/RadioGroup'

const FilterList = () => {
    // const [checked, setChecked] = useState([])

    // const handleToggle = value => () => {
    //     const currentIndex = checked.indexOf(value)
    //     const newChecked = [...checked]

    //     if (currentIndex === -1) {
    //         newChecked.push(value)
    //     } else {
    //         newChecked.splice(currentIndex, 1)
    //     }

    //     setChecked(newChecked)
    // }
    const [isOpen, toggleIsOpen] = useToggle(false)

    return (
        // <List>
        //     {[0, 1, 2, 3].map(value => {
        //         const labelId = `checkbox-list-label-${value}`

        //         return (
        //             <ListItem key={value} disablePadding>
        //                 <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
        //                     <ListItemIcon>
        //                         <Checkbox
        //                             sx={{
        //                                 color: pink[800],
        //                                 '&.Mui-checked': {
        //                                     color: pink[600]
        //                                 }
        //                             }}
        //                             edge='start'
        //                             checked={checked.includes(value)}
        //                             tabIndex={-1}
        //                             disableRipple
        //                             inputProps={{ 'aria-labelledby': labelId }}
        //                         />
        //                     </ListItemIcon>
        //                     <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
        //                 </ListItemButton>
        //             </ListItem>
        //         )
        //     })}
        // </List>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
                <ListSubheader component='div' id='nested-list-subheader'>
                    Lọc sản phẩm
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => toggleIsOpen()}>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary='Category' />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                <RadioGroup label='Việt Nam' value='' />
                <RadioGroup label='Trung Quốc' value='' />
            </Collapse>
        </List>
    )
}

export default FilterList

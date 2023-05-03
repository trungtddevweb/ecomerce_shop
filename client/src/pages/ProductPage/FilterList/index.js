import { useState } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import { pink } from '@mui/material/colors'

const FilterList = () => {
    const [checked, setChecked] = useState([])

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List>
            {[0, 1, 2, 3].map(value => {
                const labelId = `checkbox-list-label-${value}`

                return (
                    <ListItem key={value} disablePadding>
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600]
                                        }
                                    }}
                                    edge='start'
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default FilterList

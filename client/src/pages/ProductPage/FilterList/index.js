import { useEffect, useState } from 'react'
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
    RadioGroup,
    FormControl,
    FormControlLabel
} from '@mui/material'
import { brandLists, categoryLists, priceLists, sizeLists } from 'src/utils/const'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const FilterList = ({ setUrl }) => {
    const [checked, setChecked] = useState([])
    const [fields, setFields] = useState({
        category: null,
        size: null,
        brand: null,
        price: null
    })
    const handleChange = event => {
        const { name, value } = event.target
        setFields(prevFields => ({
            ...prevFields,
            [name]: value
        }))
    }

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

    useEffect(() => {
        const params = new URLSearchParams()

        Object.entries(fields).forEach(([key, value]) => {
            if (checked.includes(key) && value) {
                params.set(key, value)
            }
        })

        const url = new URL('http://localhost:3000')
        url.pathname = '/products'
        url.search = params.toString()

        setUrl(url.search.toString())
    }, [checked, fields, setUrl])
    return (
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
            <ListItemButton role={undefined} onClick={handleToggle('category')} dense>
                <ListItemIcon>
                    <Checkbox checked={checked.includes('category')} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Category' />
                {checked.includes('category') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={checked.includes('category')} timeout='auto' unmountOnExit>
                <ListItem>
                    <FormControl component='fieldset'>
                        <RadioGroup
                            name='category'
                            sx={{
                                padding: '0 12px'
                            }}
                            value={fields.category}
                            onChange={handleChange}
                        >
                            {categoryLists.map((category, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={category.value}
                                    label={category.label}
                                    control={<Radio color='error' size='small' />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </Collapse>
            <ListItemButton role={undefined} onClick={handleToggle('brand')} dense>
                <ListItemIcon>
                    <Checkbox checked={checked.includes('brand')} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Thương hiệu' />
                {checked.includes('brand') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={checked.includes('brand')} timeout='auto' unmountOnExit>
                <ListItem>
                    <FormControl component='fieldset'>
                        <RadioGroup
                            name='brand'
                            sx={{
                                padding: '0 12px'
                            }}
                            value={fields.brand}
                            onChange={handleChange}
                        >
                            {brandLists.map((brand, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={brand.value}
                                    label={brand.label}
                                    control={<Radio color='error' size='small' />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </Collapse>
            <ListItemButton role={undefined} onClick={handleToggle('sizes')} dense>
                <ListItemIcon>
                    <Checkbox checked={checked.includes('sizes')} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Kích thước' />
                {checked.includes('sizes') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={checked.includes('sizes')} timeout='auto' unmountOnExit>
                <ListItem>
                    <FormControl component='fieldset'>
                        <RadioGroup
                            name='sizes'
                            sx={{
                                padding: '0 12px'
                            }}
                            value={fields.sizes}
                            onChange={handleChange}
                        >
                            {sizeLists.map((size, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={size.value}
                                    label={size.label}
                                    control={<Radio color='error' size='small' />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </Collapse>
            <ListItemButton role={undefined} onClick={handleToggle('price')} dense>
                <ListItemIcon>
                    <Checkbox checked={checked.includes('price')} disableRipple />
                </ListItemIcon>
                <ListItemText primary='Giá' />
                {checked.includes('price') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={checked.includes('price')} timeout='auto' unmountOnExit>
                <ListItem>
                    <FormControl component='fieldset'>
                        <RadioGroup
                            name='price'
                            sx={{
                                padding: '0 12px'
                            }}
                            value={fields.price}
                            onChange={handleChange}
                        >
                            {priceLists.map((price, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={price.value}
                                    label={price.label}
                                    control={<Radio color='error' size='small' />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </ListItem>
            </Collapse>
        </List>
    )
}

export default FilterList

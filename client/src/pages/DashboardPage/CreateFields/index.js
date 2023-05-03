import { useState } from 'react'
import { Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ProductComponent from './ProductComponent'
import BlogComponent from './BlogComponent'

const CreateFields = () => {
    const [value, setValue] = useState('product')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    function getComponent(value) {
        return value === 'product' ? <ProductComponent /> : <BlogComponent />
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab label='Sản phẩm' value='product' />
                        <Tab label='Bài viết' value='blog' />
                    </TabList>
                </Box>
                <TabPanel value={value}>{getComponent(value)}</TabPanel>
            </TabContext>
        </Box>
    )
}

export default CreateFields

import { useState } from 'react'
import { Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ProductComponent from './ProductComponent'
import BlogComponent from './BlogComponent'
import VoucherComponent from './VoucherComponent/Voucher'

const CreateFields = ({ isMatch }) => {
    const [value, setValue] = useState('product')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    function getComponent(value) {
        if (value === 'product') {
            return <ProductComponent isMatch={isMatch} />
        } else if (value === 'blog') {
            return <BlogComponent isMatch={isMatch} />
        } else {
            return <VoucherComponent isMatch={isMatch} />
        }
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab label='Sản phẩm' value='product' />
                        <Tab label='Bài viết' value='blog' />
                        <Tab label='Mã giảm giá' value='voucher' />
                    </TabList>
                </Box>
                <TabPanel value={value}>{getComponent(value)}</TabPanel>
            </TabContext>
        </Box>
    )
}

export default CreateFields

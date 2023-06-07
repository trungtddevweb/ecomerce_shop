import {
    Grid,
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Divider,
    ListItem,
    ListItemAvatar,
    Avatar,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
    Tabs,
    Tab
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Create, HistoryEduOutlined, Inventory, LocalShipping, Loyalty, ManageAccounts } from '@mui/icons-material'
import DiscountIcon from '@mui/icons-material/Discount'
import DashboardIcon from '@mui/icons-material/Dashboard'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import BlogsDashboard from './Blogs'
import ProductsDashboard from './Products'
import CreateFields from './CreateFields'
import VouchersDashboard from './Vouchers'
import UsersDashBoard from './Users'
import OrdersDashboard from './Orders/'
import ProductsSaleDashboard from './ProductsSale'
import DashBoard from './DashBoard/DashBoard'
import useScrollToTop from '~/hooks/useScrollToTop'

const DashboardPage = () => {
    useDocumentTitle('Quản lý danh mục')
    useScrollToTop()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const { managerId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user.userInfo)
    const isAdmin = user.isAdmin
    const [value, setValue] = useState(managerId)

    const [selectedParam, setSelectedParam] = useState(managerId)

    const handleListItemClick = (event, path) => {
        setSelectedParam(path)
        navigate(`/dashboard/${path}`)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function getFields(params) {
        switch (params) {
            case 'users':
                return <UsersDashBoard />
            case 'products':
                return <ProductsDashboard />
            case 'blogs':
                return <BlogsDashboard />
            case 'create':
                return <CreateFields isMatch={isMatch} />
            case 'vouchers':
                return <VouchersDashboard />
            case 'orders':
                return <OrdersDashboard />
            case 'products-sale':
                return <ProductsSaleDashboard />
            case 'dashboard':
                return <DashBoard />
            default:
                return <ProductsDashboard />
        }
    }

    // Effects
    if (!isAdmin) {
        return <Navigate to='/' replace />
    }

    return (
        <Box
            p={1}
            sx={{
                display: {
                    xs: 'flow-root',
                    md: 'flex'
                }
            }}
            paddingY={5}
            minHeight='70vh'
            bgcolor='lightgray'
            justifyContent='center'
        >
            <Grid
                sx={{
                    width: {
                        md: '1400px'
                    }
                }}
                container
                spacing={{ xs: 2, md: 1, xl: 2 }}
            >
                <Grid item xs={12} md={3} xl={3}>
                    <Paper elevation={6}>
                        {isMatch ? (
                            <Tabs
                                variant='scrollable'
                                scrollButtons={false}
                                allowScrollButtonsMobile
                                value={value}
                                onChange={handleChange}
                                aria-label='icon tabs example'
                            >
                                <Tab
                                    icon={<HistoryEduOutlined />}
                                    value='blogs'
                                    aria-label='blogs'
                                    onClick={event => handleListItemClick(event, 'blogs')}
                                />
                                <Tab
                                    icon={<Inventory />}
                                    aria-label='products'
                                    value='products'
                                    onClick={event => handleListItemClick(event, 'products')}
                                />
                                <Tab
                                    icon={<ManageAccounts />}
                                    aria-label='users'
                                    value='users'
                                    onClick={event => handleListItemClick(event, 'users')}
                                />
                                <Tab
                                    icon={<DiscountIcon />}
                                    aria-label='voucher'
                                    value='voucher'
                                    onClick={event => handleListItemClick(event, 'vouchers')}
                                />
                                <Tab
                                    icon={<Loyalty />}
                                    aria-label='products-sale'
                                    value='products-sale'
                                    onClick={event => handleListItemClick(event, 'products-sale')}
                                />
                                <Tab
                                    icon={<LocalShipping />}
                                    aria-label='orders'
                                    value='orders'
                                    onClick={event => handleListItemClick(event, 'orders')}
                                />
                                <Tab
                                    icon={<Create />}
                                    aria-label='create'
                                    value='create'
                                    onClick={event => handleListItemClick(event, 'create')}
                                />
                            </Tabs>
                        ) : (
                            <>
                                <List
                                    component='nav'
                                    aria-label='manager products blogs'
                                    subheader={
                                        <ListSubheader component='div' id='nested-list-subheader'>
                                            Danh mục quản lý
                                        </ListSubheader>
                                    }
                                >
                                    <Divider variant='fullWidth' component='div' />

                                    <ListItemButton
                                        selected={selectedParam === 'blogs'}
                                        onClick={event => handleListItemClick(event, 'blogs')}
                                    >
                                        <ListItemIcon>
                                            <HistoryEduOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary='Bài viết' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'products'}
                                        onClick={event => handleListItemClick(event, 'products')}
                                    >
                                        <ListItemIcon>
                                            <Inventory />
                                        </ListItemIcon>
                                        <ListItemText primary='Sản phẩm' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'users'}
                                        onClick={event => handleListItemClick(event, 'users')}
                                    >
                                        <ListItemIcon>
                                            <ManageAccounts />
                                        </ListItemIcon>
                                        <ListItemText primary='Người dùng' />
                                    </ListItemButton>
                                    {/* <Divider variant='fullWidth' component='div' /> */}
                                    <ListItemButton
                                        selected={selectedParam === 'orders'}
                                        onClick={event => handleListItemClick(event, 'orders')}
                                    >
                                        <ListItemIcon>
                                            <LocalShipping />
                                        </ListItemIcon>
                                        <ListItemText primary='Đơn hàng' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'vouchers'}
                                        onClick={event => handleListItemClick(event, 'vouchers')}
                                    >
                                        <ListItemIcon>
                                            <DiscountIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Mã giảm giá' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'products-sale'}
                                        onClick={event => handleListItemClick(event, 'products-sale')}
                                    >
                                        <ListItemIcon>
                                            <Loyalty />
                                        </ListItemIcon>
                                        <ListItemText primary='Sản phẩm sale' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'dashboard'}
                                        onClick={event => handleListItemClick(event, 'dashboard')}
                                    >
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Dashboard' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'create'}
                                        onClick={event => handleListItemClick(event, 'create')}
                                    >
                                        <ListItemIcon>
                                            <Create />
                                        </ListItemIcon>
                                        <ListItemText primary='Tạo mới' />
                                    </ListItemButton>
                                </List>
                                <ListItem
                                    sx={{
                                        padding: '0 16px'
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={user?.picture} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={
                                            <Typography component='span' variant='body2' color='#bdbdbd'>
                                                Người quản lý
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9} xl={9}>
                    <Paper elevation={6}>{getFields(selectedParam)}</Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardPage

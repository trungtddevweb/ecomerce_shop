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
import { Create, HistoryEduOutlined, Inventory, ManageAccounts } from '@mui/icons-material'
import DiscountIcon from '@mui/icons-material/Discount'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import BlogsDashboard from './Blogs/BlogsDashboard'
import ProductsDashboard from './Products/ProductsDashboard'
import CreateFields from './CreateFields'
import Vouchers from './Vouchers/Vochers'
import UsersDashBoard from './Users/UsersDashBoard'
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
                return <Vouchers />
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
                <Grid item xs={12} md={3} xl={4}>
                    <Paper elevation={6}>
                        {isMatch ? (
                            <Tabs value={value} onChange={handleChange} aria-label='icon tabs example'>
                                <Tab
                                    icon={<HistoryEduOutlined />}
                                    value='blogs'
                                    aria-label='blogs'
                                    onClick={event => handleListItemClick(event, 'blogs')}
                                />
                                <Tab
                                    icon={<Inventory />}
                                    aria-label='inventory'
                                    value='products'
                                    onClick={event => handleListItemClick(event, 'products')}
                                />
                                <Tab
                                    icon={<ManageAccounts />}
                                    aria-label='person'
                                    value='users'
                                    onClick={event => handleListItemClick(event, 'users')}
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
                                        selected={selectedParam === 'create'}
                                        onClick={event => handleListItemClick(event, 'create')}
                                    >
                                        <ListItemIcon>
                                            <Create />
                                        </ListItemIcon>
                                        <ListItemText primary='Tạo mới' />
                                    </ListItemButton>
                                    <ListItemButton
                                        selected={selectedParam === 'vouchers'}
                                        onClick={event => handleListItemClick(event, 'vouchers')}
                                    >
                                        <ListItemIcon>
                                            <DiscountIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Giảm giá' />
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
                <Grid item xs={12} md={9} xl={8}>
                    <Paper elevation={6}>{getFields(selectedParam)}</Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardPage

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
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Create, HistoryEduOutlined, Inventory, ManageAccounts } from '@mui/icons-material'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import BlogsDashboard from './Blogs/BlogsDashboard'
import ProductsDashboard from './Products/ProductsDashboard'
import CreateFields from './CreateFields'
import UsersDashBoard from './Users/UsersDashBoard'
import useScrollToTop from '~/hooks/useScrollToTop'

const DashboardPage = () => {
    useDocumentTitle('Quản lý danh mục')
    useScrollToTop()
    const { managerId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth?.user.userInfo)
    const isAdmin = user?.isAdmin

    const [selectedParam, setSelectedParam] = useState(managerId)

    const handleListItemClick = (event, path) => {
        setSelectedParam(path)
        navigate(`/dashboard/${path}`)
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
                return <CreateFields />
            default:
                return <ProductsDashboard />
        }
    }

    // Effects
    if (!isAdmin) {
        return <Navigate to='/' replace />
    }

    return (
        <Grid className='dashboard-page' padding='0px' display='flex' justifyContent='center'>
            <Grid container spacing={4} className='dashboard-wrapper'>
                <Grid item xs={4}>
                    <Paper elevation={6}>
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
                                <ListItemText primary='Tất cả bài viết' />
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
                                <ListItemText primary='Thông tin người dùng' />
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
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={6}>{getFields(selectedParam)}</Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardPage

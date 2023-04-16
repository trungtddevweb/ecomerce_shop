import { useState } from 'react'
import {
    AppBar,
    Toolbar,
    MenuItem,
    Typography,
    Tab,
    Tabs,
    Avatar,
    Stack,
    Menu,
    Fade,
    ListItemIcon,
    Tooltip
} from '@mui/material'
import { CleanHands, Inventory, Logout } from '@mui/icons-material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Search from '../Search'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '~/api/main'
import CustomBackDrop from '~/components/BackDrop'
import { logoutSuccess } from 'src/redux/slice/usersSlice'
import Cart from '../Cart'
import noImage from 'src/assets/imgs'
import routes from 'src/utils/routes'
import { tabsNavigationHeader } from 'src/utils/const'
import useStyles from '~/assets/styles/useStyles'

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const token = localStorage.getItem('token')
    const classes = useStyles()
    // const [value, setValue] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth?.user?.userInfo)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const location = useLocation()

    const activeTab = tabsNavigationHeader.findIndex(tab => tab.value === location.pathname)

    // Handlers
    const handleChange = (event, newValue) => {
        navigate(`${newValue}`)
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogout = async () => {
        setIsloading(true)
        handleClose()
        try {
            const res = await logout(token)
            if (res?.status === 200) {
                dispatch(logoutSuccess())
                setIsloading(false)
                navigate('/login')
            }
        } catch (error) {
            setIsloading(false)
            console.error('Error; ', error)
        }
    }

    return (
        <AppBar className='header' position='sticky'>
            <Toolbar className='header-wrapper'>
                <Stack direction='row' alignItems='center'>
                    <Typography
                        className={classes.hoverItem}
                        component={Link}
                        to={routes.home.path}
                        marginRight='20px'
                        variant='h5'
                    >
                        MyStore
                    </Typography>
                    <Tabs
                        value={tabsNavigationHeader[activeTab]?.value || false}
                        onChange={handleChange}
                        aria-label='nav tabs example'
                        indicatorColor='secondary'
                        textColor='secondary'
                    >
                        {tabsNavigationHeader.map((tab, index) => (
                            <Tab key={index} label={tab.label} value={tab.value} />
                        ))}
                    </Tabs>
                </Stack>
                <Stack direction='row'>
                    <Search />
                    <Stack
                        id='fade-button'
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        direction='row'
                        alignItems='center'
                    >
                        <Tooltip title='Cài đặt tài khoản'>
                            <Stack
                                direction='row'
                                onClick={handleClick}
                                size='small'
                                sx={{ ml: 2, cursor: 'pointer' }}
                                alignItems='center'
                                gap='8px'
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    <Avatar src={user?.picture || noImage} alt={user?.name} />
                                </Avatar>
                                <Typography className='username-header' variant='inherit'>
                                    {user?.name}
                                </Typography>
                            </Stack>
                        </Tooltip>
                    </Stack>
                    <Menu
                        id='fade-menu'
                        MenuListProps={{
                            'aria-labelledby': 'fade-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0
                                }
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem className={classes.hoverItem} onClick={handleClose}>
                            <Avatar /> Thông tin
                        </MenuItem>
                        <MenuItem
                            className={classes.hoverItem}
                            component={Link}
                            to='/dashboard/blogs'
                            hidden={!user?.isAdmin}
                            onClick={handleClose}
                        >
                            <ListItemIcon>
                                <Inventory fontSize='small' />
                            </ListItemIcon>
                            Quản lý danh mục
                        </MenuItem>
                        <MenuItem className={classes.hoverItem} onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                    <Cart component={Link} to={routes.cart.path} />
                </Stack>
            </Toolbar>
            <CustomBackDrop open={isLoading} />
        </AppBar>
    )
}

export default Header

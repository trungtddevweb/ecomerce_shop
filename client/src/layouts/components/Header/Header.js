import { useState } from 'react'
import { Box, AppBar, Toolbar, MenuItem, Typography, Tab, Tabs, Avatar, Stack, Menu, Fade, ListItemIcon, Tooltip } from "@mui/material"
import { Inventory, Logout } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/api/main';
import CustomBackDrop from '~/components/BackDrop';
import { logoutSuccess } from 'src/redux/slice/usersSlice';
import Cart from '../Cart';
import noImage from 'src/assets/imgs'
import routes from 'src/utils/routes';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsloading] = useState(false)

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    // Handlers
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogout = async () => {
        setIsloading(true)
        handleClose()
        try {
            await logout()
            dispatch(logoutSuccess())
            setIsloading(false)
            navigate('/login')
        } catch (error) {
            setIsloading(false)
            console.log("Error; ", error)
        }
    }


    return (
        <AppBar className="header" position="sticky" color="transparent">
            <Toolbar
                className="header-wrapper"

            >
                <Stac >
                    <Typography component={Link} to="/" variant="h5">MyStore</Typography>
                    <Tabs
                        textColor='primary'
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        indicatorColor='secondary'
                    >
                        {/* <Tab label="Trang chủ" component={Link} to={routes.home.path} /> */}
                        <Tab label="Bài viết" component={Link} to={routes.blog.path} />
                        <Tab label='Giới thiệu' component={Link} to={routes.about.path} />
                        <Tab label='Liên hệ' component={Link} to={routes.contact.path} />
                        <Tab label='sẩn phẩm' component={Link} to={routes.categories.path} />
                    </Tabs>
                </Stac >
                <Box sx={{
                    margin: 'auto'
                }}>
                    <Search />
                </Box>
                <Stack
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    direction="row"
                    alignItems='center'
                >
                    <Tooltip title="Cài đặt tài khoản">
                        <Stack
                            direction='row'
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, cursor: 'pointer' }}
                            alignItems='center'
                            gap='8px'
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <Avatar src={user?.picture || noImage} alt={user?.name} />
                            </Avatar>
                            <Typography className='username-header' variant='inherit'>{user?.name}</Typography>
                        </Stack>
                    </Tooltip>
                </Stack>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
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
                                mr: 1,
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
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> Thông tin
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to={routes.dashboard.path}
                        hidden={!user?.isAdmin}
                        onClick={handleClose}
                    >
                        <ListItemIcon>
                            <Inventory fontSize="small" />
                        </ListItemIcon>
                        Quản lý sản phẩm
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Đăng xuất
                    </MenuItem>

                </Menu>
                <Cart component={Link} to={routes.cart.path} />
            </Toolbar>
            <CustomBackDrop open={isLoading} />
        </AppBar>
    )
}

export default Header
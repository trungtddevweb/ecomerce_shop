import { useState } from 'react'
import noImage from 'src/assets/imgs'
import { logoutSuccess } from 'src/redux/slice/usersSlice'
import { Inventory, Logout } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '~/api/main'
import { Avatar, Fade, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import routes from 'src/utils/routes'
import { Link, useNavigate } from 'react-router-dom'
import useStyles from '~/assets/styles/useStyles'
import { memo } from 'react'

const MenuUser = ({ onClose, onLoading }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth?.user?.userInfo)
    const open = Boolean(anchorEl)
    const token = localStorage.getItem('token')

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        onClose()
    }

    const handleLogout = async () => {
        handleClose()
        onLoading(true)
        try {
            await logout(token)
            dispatch(logoutSuccess())
            onLoading(true)
            navigate('/login')
        } catch (error) {
            onLoading(false)
            console.error('Error; ', error)
            handleClose()
        }
    }

    return (
        <>
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
                        sx={{
                            cursor: 'pointer',
                            marginLeft: {
                                sm: 0,
                                md: '12px'
                            }
                        }}
                        alignItems='center'
                        gap='8px'
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <Avatar src={user?.picture || noImage} alt={user?.name} />
                        </Avatar>

                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '150px'
                            }}
                            variant='inherit'
                        >
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
                <Link onClick={handleClose} to={routes.personal.path} className={classes.hoverItem}>
                    <MenuItem>
                        <ListItemIcon>
                            <Avatar fontSize='small' />
                        </ListItemIcon>
                        Thông tin
                    </MenuItem>
                </Link>
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
        </>
    )
}

export default memo(MenuUser)

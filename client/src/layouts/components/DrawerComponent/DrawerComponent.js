import { useCallback } from 'react'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { ContactPage, HistoryEdu, Home, Inventory2, SupervisedUserCircle } from '@mui/icons-material'
import MenuUser from '../MenuUser'
import Cart from '../Cart/Cart'
import routes from 'src/utils/routes'

function DrawerComponent({ openDrawer, onCloses, onLoading }) {
    const handleClose = useCallback(() => {
        onCloses(false)
    }, [onCloses])

    return (
        <Drawer onClose={() => onCloses(false)} anchor='left' open={openDrawer}>
            <Box sx={{ width: '100%', minWidth: 250, bgcolor: 'background.paper' }}>
                <Box component='nav' aria-label='main mailbox folders'>
                    <List>
                        <Link to={routes.home.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary='Trang chủ' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={routes.blog.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HistoryEdu />
                                    </ListItemIcon>
                                    <ListItemText primary='Bài viết' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={routes.about.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SupervisedUserCircle />
                                    </ListItemIcon>
                                    <ListItemText primary='Giới thiệu' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={routes.contact.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContactPage />
                                    </ListItemIcon>
                                    <ListItemText primary='Liên hệ' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={routes.product.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Inventory2 />
                                    </ListItemIcon>
                                    <ListItemText primary='Sản phẩm' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to={routes.cart.path}>
                            <ListItem disablePadding onClick={handleClose}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Cart />
                                    </ListItemIcon>
                                    <ListItemText primary='Giỏ hàng' />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Divider component='div' variant='fullWidth' />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <MenuUser onLoading={onLoading} onClose={onCloses} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Drawer>
    )
}
export default DrawerComponent

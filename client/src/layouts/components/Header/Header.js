import { useState, useEffect } from 'react'
import { Toolbar, Typography, Tab, Tabs, Stack, Box, Paper, useMediaQuery, useTheme } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Search from '../Search'
import Cart from '../Cart'
import routes from 'src/utils/routes'
import { tabsNavigationHeader } from 'src/utils/const'
import useStyles from '~/assets/styles/useStyles'
import DrawerComponent from '../DrawerComponent'
import MenuUser from '../MenuUser'
import CustomBackDrop from '~/components/BackDrop/CustomBackDrop'

const Header = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    // State
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const activeTab = tabsNavigationHeader.findIndex(tab => tab.value === location.pathname)
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    // Handlers
    const handleChange = (event, newValue) => {
        navigate(`${newValue}`)
    }

    const [prevScrollpos, setPrevScrollpos] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollpos = window.pageYOffset
            setVisible(prevVisible => {
                const isVisible = currentScrollpos <= 0 || currentScrollpos < prevScrollpos
                setPrevScrollpos(currentScrollpos)
                return isVisible
            })
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollpos])

    return (
        <Box
            component={Paper}
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
            className={`navbar ${visible ? 'navbar--visible' : 'navbar--hidden'}`}
            position='sticky'
        >
            <Box
                sx={{
                    width: {
                        md: '1400px',
                        sm: 'auto'
                    }
                }}
            >
                <Toolbar
                    sx={{
                        flexGrow: 1,
                        justifyContent: 'space-between'
                    }}
                >
                    <Stack direction='row' alignItems='center'>
                        {isMatch && <MenuIcon onClick={() => setToggleDrawer(!toggleDrawer)} />}
                        <DrawerComponent
                            onLoading={setIsLoading}
                            openDrawer={toggleDrawer}
                            onCloses={setToggleDrawer}
                        />
                        <Typography
                            className={classes.hoverItem}
                            component={Link}
                            to={routes.home.path}
                            marginRight='20px'
                            marginLeft={isMatch ? '16px' : 0}
                            variant='h5'
                        >
                            MyStore
                        </Typography>
                        {!isMatch && (
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
                        )}
                    </Stack>
                    <Stack direction='row'>
                        {!isMatch && <Search />}
                        {!isMatch && <MenuUser />}
                        {!isMatch && <Cart component={Link} to={routes.cart.path} />}
                        {isMatch && <Search />}
                    </Stack>
                </Toolbar>
            </Box>
            <CustomBackDrop open={isLoading} />
        </Box>
    )
}

export default Header

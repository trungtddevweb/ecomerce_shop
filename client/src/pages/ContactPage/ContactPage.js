import {
    Box,
    Card,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import ContactForm from './ContactForm/ContactForm'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { Facebook, Instagram, LinkedIn, LocationOn, Mail, Phone, Telegram, Twitter } from '@mui/icons-material'
import useStyles from '~/assets/styles/useStyles'
import useScrollToTop from '~/hooks/useScrollToTop'

const ContactPage = () => {
    useDocumentTitle('Liên hệ')
    useScrollToTop()
    const classes = useStyles()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box display='flex' padding={isMatch ? '32px 8px' : 6} bgcolor='lightgray' justifyContent='center'>
            <Card
                sx={{
                    width: {
                        md: '1000px',
                        sm: 'auto'
                    }
                }}
            >
                <Grid container>
                    <Grid
                        borderRadius={2}
                        bgcolor='#01579b'
                        padding={isMatch ? 2 : 4}
                        display='flex'
                        flexDirection='column'
                        gap='20px'
                        item
                        xs={12}
                        md={5}
                    >
                        <Stack spacing={1}>
                            <Typography variant='h5' color='white'>
                                Thông tin liên hệ
                            </Typography>
                            <Typography variant='body2' color='whitesmoke'>
                                Điền vào biểu mẫu và chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ!
                            </Typography>
                        </Stack>
                        <List
                            aria-label='contacts'
                            sx={{
                                color: 'white',
                                marginBottom: 'auto'
                            }}
                        >
                            <ListItem>
                                <ListItemIcon>
                                    <Phone color='success' />
                                </ListItemIcon>
                                <ListItemText>+8435 2828 651</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Mail color='warning' />
                                </ListItemIcon>
                                <ListItemText>contact@gmail.com</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOn color='error' />
                                </ListItemIcon>
                                <ListItemText>Gia Lâm, Hà Nội, Việt Nam</ListItemText>
                            </ListItem>
                        </List>
                        <Stack>
                            <Typography variant='body2' color='whitesmoke'>
                                Mạng xã hội
                            </Typography>
                            <List aria-label='contacts-icon' className={isMatch ? classes.flexBox : ''}>
                                <ListItemIcon>
                                    <Tooltip title='Facebook'>
                                        <IconButton className={classes.iconButton}>
                                            <Facebook fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <Tooltip title='Instagram'>
                                        <IconButton className={classes.iconButton}>
                                            <Instagram fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <Tooltip title='Twitter'>
                                        <IconButton className={classes.iconButton}>
                                            <Twitter fontSize='small' color='info' />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <Tooltip title='Linked In'>
                                        <IconButton className={classes.iconButton}>
                                            <LinkedIn fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <Tooltip title='Telegram'>
                                        <IconButton className={classes.iconButton}>
                                            <Telegram fontSize='small' />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemIcon>
                            </List>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7} padding={isMatch ? 0 : 3}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default ContactPage

import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box, Grid, Stack, Typography, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import footerImage from '~/assets/imgs/footer-bg.jpg'

const Footer = () => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box
            padding='16px 8px'
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                background: `url(${footerImage})`,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                }
            }}
        >
            <Box
                sx={{
                    zIndex: 10,
                    maxWidth: {
                        lg: '1400px',
                        sm: 'auto'
                    }
                }}
            >
                <Grid container color='lavender' spacing={2}>
                    {!isMatch && (
                        <Grid item xs={12} sm={3}>
                            <Typography marginBottom={2} color={isMatch ? 'secondary' : 'primary'} variant='h4'>
                                MyStore
                            </Typography>
                            <Typography variant='body' paragraph textAlign='justify'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente nihil voluptatibus
                                accusantium qui minima dolorum repudiandae quasi voluptates voluptate vel id illo odio
                                assumenda totam eos atque, tempore consequuntur corrupti.
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={3}>
                        <Typography
                            marginBottom={2}
                            color={isMatch ? 'secondary' : 'primary'}
                            variant={isMatch ? 'h6' : 'h5'}
                        >
                            Liên hệ với chúng tôi
                        </Typography>
                        <Stack spacing={2}>
                            <Stack spacing={1} direction='row'>
                                <LocationOnIcon />
                                <Typography>Gia Lâm, Hà Nội, Việt Nam</Typography>
                            </Stack>
                            <Stack spacing={1} direction='row'>
                                <EmailIcon />
                                <Typography>info@gmail.com</Typography>
                            </Stack>
                            <Stack spacing={1} direction='row'>
                                <PhoneIcon />
                                <Typography>0352828651</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography
                            marginBottom={2}
                            color={isMatch ? 'secondary' : 'primary'}
                            variant={isMatch ? 'h6' : 'h5'}
                        >
                            Giờ mở cửa
                        </Typography>
                        <Stack spacing={2}>
                            <Typography>Thứ 2 -Thứ 5: 8.am - 9.pm</Typography>
                            <Typography>Thứ 6 - Thứ 7: 8.am - 1.am</Typography>
                            <Typography>Chủ Nhật: 9.am - 10.pm</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography
                            marginBottom={2}
                            color={isMatch ? 'secondary' : 'primary'}
                            variant={isMatch ? 'h6' : 'h5'}
                        >
                            Thông tin
                        </Typography>
                        <Stack direction='column'>
                            <ListItemText>Giao hàng</ListItemText>
                            <ListItemText>Trả hàng</ListItemText>
                            <ListItemText>Sự kiện</ListItemText>
                            <ListItemText>Chính sách và bảo mật</ListItemText>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant='body2' color='white'>
                © 2023 MyStore. All rights reserved
            </Typography>
        </Box>
    )
}

export default Footer

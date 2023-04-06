import { StackedBarChartOutlined } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box, Grid, Stack, Typography, ListItemText } from '@mui/material'

const Footer = () => {
    return (
        <Box maxHeight={400} paddingY={6} className="footer d-flex flex-column">
            <Grid container color='lavender' className="footer-container" spacing={2}>
                <Grid item xs={3} >
                    <Typography marginBottom={4} variant="h4">MyStore</Typography>
                    <Typography variant='body' textAlign='justify'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente nihil voluptatibus accusantium qui minima dolorum repudiandae quasi voluptates voluptate vel id illo odio assumenda totam eos atque, tempore consequuntur corrupti.
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography marginBottom={4} variant="h5">Liên hệ với chúng tôi</Typography>
                    <Stack spacing={2}>
                        <Stack spacing={1} direction='row' >
                            <LocationOnIcon />
                            <Typography>Gia Lâm, Hà Nội, Việt Nam</Typography>
                        </Stack>
                        <Stack spacing={1} direction='row' >
                            <EmailIcon />
                            <Typography>info@gmail.com</Typography>
                        </Stack>
                        <Stack spacing={1} direction='row' >
                            <PhoneIcon />
                            <Typography>0352828651</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={3} >
                    <Typography marginBottom={4} variant='h5'>Giờ mở cửa</Typography>
                    <Stack spacing={2}>
                        <Typography>
                            Thứ 2 -Thứ 5: 8.am - 9.pm
                        </Typography>
                        <Typography>
                            Thứ 6 - Thứ 7: 8.am - 1.am
                        </Typography>
                        <Typography >
                            Chủ Nhật: 9.am - 10.pm
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Typography marginBottom={4} variant="h5">Thông tin</Typography>
                    <Stack direction="column">
                        <ListItemText>
                            Giao hàng
                        </ListItemText>
                        <ListItemText >
                            Trả hàng
                        </ListItemText>
                        <ListItemText >
                            Sự kiện
                        </ListItemText>
                        <ListItemText>
                            Chính sách và bảo mật
                        </ListItemText>
                    </Stack>
                </Grid>
            </Grid >
            <Typography color='white' variant='body2'>© 2023   MyStore. All rights reserved</Typography>
        </Box >
    )
}

export default Footer

import { Send } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import useStyles from '~/assets/styles/useStyles'

const NewLetters = () => {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()

    return (
        <Box
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                height: {
                    md: 250,
                    xs: 400
                }
            }}
            marginY={isMatch ? 1 : 6}
            className={classes.flexBox}
        >
            <Grid
                sx={{
                    bgcolor: 'white',
                    alignItems: 'center',
                    width: {
                        md: 1400,
                        sm: 'auto'
                    }
                }}
                padding={4}
                // borderRadius={4}
                container
            >
                <Grid item xs={12} md={5}>
                    <Stack className={isMatch && classes.flexBox}>
                        <Typography variant='h5'>Nhận thông báo ngay</Typography>
                        <Typography variant='caption' textAlign={isMatch && 'center'} color='gray' fontStyle='italic'>
                            Bạn sẽ không bỏ lỡ bất kì thông báo nào khi có các chương trình khuyến mãi đặc biệt từ chúng
                            tôi!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack direction={isMatch ? 'column' : 'row'} component='form' spacing={1}>
                        <TextField
                            type='email'
                            required
                            autoComplete='email'
                            fullWidth
                            placeholder='Nhập email'
                            label='Email'
                        />
                        <Button
                            sx={{
                                minWidth: {
                                    md: 150
                                }
                            }}
                            variant='contained'
                            endIcon={<Send />}
                            size={isMatch ? 'small' : 'medium'}
                        >
                            Subscribe
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NewLetters

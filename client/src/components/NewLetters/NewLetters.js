import { Send } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'

const NewLetters = () => {
    return (
        <Box
            width='100%'
            bgcolor='rgba(0, 0, 0, 0.8)'
            height={250}
            display='flex'
            marginY={6}
            justifyContent='center'
            alignItems='center'
        >
            <Grid width={1200} alignItems='center' bgcolor='white' padding={4} borderRadius={4} container>
                <Grid item xs={5}>
                    <Stack>
                        <Typography variant='h5'>Nhận thông báo ngay</Typography>
                        <Typography variant='caption' color='gray' fontStyle='italic'>
                            Bạn sẽ không bỏ lỡ bất kì thông báo nào khi có các chương trình khuyến mãi đặc biệt từ chúng
                            tôi!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={7}>
                    <Stack direction='row' component='form' spacing={1}>
                        <TextField type='email' required fullWidth placeholder='Nhập email' label='Email' />
                        <Button
                            sx={{
                                minWidth: 150
                            }}
                            variant='contained'
                            endIcon={<Send />}
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

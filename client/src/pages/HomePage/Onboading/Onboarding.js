import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import onBoardingImg from '~/assets/imgs/onboarding.jpg'
import useStyles from '~/assets/styles/useStyles'
import orderImage from '~/assets/imgs/orderStatus/order.png'
import checkedImage from '~/assets/imgs/orderStatus/checked.png'
import shippingImage from '~/assets/imgs/orderStatus/shipping.png'
import returnImage from '~/assets/imgs/orderStatus/return.png'

const Onboarding = () => {
    const classes = useStyles()
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${onBoardingImg})`,
                backgroundSize: 'cover',
                height: 450,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(155, 155, 155, 0.5)'
                }
            }}
        >
            <Grid width={1400} zIndex={10} container spacing={3}>
                <Grid item xs={3}>
                    <Card
                        sx={{
                            height: 350
                        }}
                        className={classes.flexBox}
                    >
                        <CardContent>
                            <Box className={classes.itemOnboarding} bgcolor='info'>
                                <CardMedia
                                    sx={{
                                        width: '75px !important',
                                        height: '75px'
                                    }}
                                    component='img'
                                    src={orderImage}
                                />
                            </Box>
                            <Typography
                                marginTop={2}
                                variant='h6'
                                fontSize='large'
                                fontWeight='bold'
                                textAlign='center'
                            >
                                Chọn sản phẩm
                            </Typography>
                            <Typography variant='body2' color='gray' textAlign='center'>
                                Hãy chọn sản phẩm yêu thích và thêm vào giỏ hàng
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        sx={{
                            height: 350
                        }}
                        className={classes.flexBox}
                    >
                        <CardContent>
                            <Box className={classes.itemOnboarding} bgcolor='info'>
                                <CardMedia
                                    sx={{
                                        width: '75px !important',
                                        height: '75px'
                                    }}
                                    component='img'
                                    src={checkedImage}
                                />
                            </Box>
                            <Typography
                                marginTop={2}
                                variant='h6'
                                fontSize='large'
                                fontWeight='bold'
                                textAlign='center'
                            >
                                Đặt hàng đã chọn
                            </Typography>
                            <Typography variant='body2' color='gray' textAlign='center'>
                                Khi đã chọn được món hàng ưng ý, hãy đặt liền tay
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        sx={{
                            height: 350
                        }}
                        className={classes.flexBox}
                    >
                        <CardContent>
                            <Box className={classes.itemOnboarding} bgcolor='info'>
                                <CardMedia
                                    sx={{
                                        width: '75px !important',
                                        height: '75px'
                                    }}
                                    component='img'
                                    src={shippingImage}
                                />
                            </Box>
                            <Typography
                                marginTop={2}
                                variant='h6'
                                fontSize='large'
                                fontWeight='bold'
                                textAlign='center'
                            >
                                Giao hàng
                            </Typography>
                            <Typography variant='body2' color='gray' textAlign='center'>
                                Chờ đơn hàng được giao tới tay bạn và thanh toán
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card
                        sx={{
                            height: 350
                        }}
                        className={classes.flexBox}
                    >
                        <CardContent>
                            <Box className={classes.itemOnboarding} bgcolor='info'>
                                <CardMedia
                                    sx={{
                                        width: '75px !important',
                                        height: '75px'
                                    }}
                                    component='img'
                                    src={returnImage}
                                />
                            </Box>
                            <Typography
                                marginTop={2}
                                variant='h6'
                                fontSize='large'
                                fontWeight='bold'
                                textAlign='center'
                            >
                                Trả hàng và hoàn phí
                            </Typography>
                            <Typography variant='body2' color='gray' textAlign='center'>
                                Nếu đơn hàng không như bạn mong muốn, có thể đổi trả trong vòng 7 ngày
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Onboarding
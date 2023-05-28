import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'mui-image'
import { Link } from 'react-router-dom'
import { formatPrice } from 'src/utils/format'
import useStyles from '~/assets/styles/useStyles'

const SlideImage = ({ slider }) => {
    const classes = useStyles()
    return (
        <Box className={classes.flexBox} bgcolor='#e6eaf0' minHeight={600}>
            <Grid width={1400} container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Image alt='slide Image' src={slider.productImages?.[2]} duration={0} height={500} />
                </Grid>
                <Grid className={classes.flexBox} item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h4'>{slider.name}</Typography>
                        <Typography variant='h3' color='error'>
                            {formatPrice(slider.price)} đ
                        </Typography>
                        <Link to={`/products/${slider._id}`}>
                            <Button sx={{ width: 'max-content' }} variant='contained' size='large'>
                                Mua Ngay
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SlideImage

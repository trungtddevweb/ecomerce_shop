import React from 'react'
import { Typography, Box, Paper, Divider, Stack, Grid } from '@mui/material'
import useDocumentTitle from '~/hooks/useDocumentTitle'
import useScrollToTop from '~/hooks/useScrollToTop'
import Image from 'mui-image'
import goalImage from '~/assets/imgs/image_1_about.jpg'
import hotImage1 from '~/assets/imgs/image_2_about.jpg'
import hotImage2 from '~/assets/imgs/image_3_about.jpg'
import hotImage3 from '~/assets/imgs/image_4_about.jpg'
import cooperation from '~/assets/imgs/hop_tac.jpg'
import NewLetters from '~/components/NewLetters'

function AboutPage() {
    useDocumentTitle('Giới thiệu')
    useScrollToTop()

    return (
        <Box display='flex' bgcolor='lightGray' alignItems='center' flexDirection='column'>
            <Box width={1000} marginY={5}>
                <Paper
                    sx={{
                        padding: '16px'
                    }}
                >
                    <Typography variant='h5' color='primary'>
                        Giới thiệu MyStore
                    </Typography>
                    <Divider component='div' variant='fullWidth' />
                    <Box marginY={2}>
                        <Stack spacing={1} marginBottom={2}>
                            <Typography variant='body1' fontWeight={600}>
                                Giới thiệu chung
                            </Typography>
                            <Typography variant='body1'>
                                Nắm bắt được thị trường mua bán online cũng như các sàn thương mại điện tử đang vô cùng
                                phát triển nên chúng tôi đã tạo ra một nơi để quý khách hàng mua sắm trực tuyển, với đầy
                                đủ các tính năng và giao diện thân thiện và dễ sử dụng hi vọng sẽ mang lại trải nghiệm
                                tốt nhất tới quý khách hàng!
                            </Typography>
                        </Stack>
                        <Stack spacing={1} marginBottom={2}>
                            <Typography variant='body1' fontWeight={600}>
                                Mục tiêu
                            </Typography>
                            <Typography variant='body1'>
                                Chúng tôi thật sự tin tưởng vào sức mạnh khai triển của công nghệ và mong muốn góp phần
                                làm cho thế giới trở nên tốt đẹp hơn bằng việc tạo ra nhiều sản phẩm có giá trị cho cuộc
                                sống trong tương lai, MyStore sẽ cố gắng cải thiện hàng ngày để đáp ứng yêu cầu của
                                khách hàng một cách tốt nhất để trở thành một cửa hàng mua sắm trực tuyến tin dùng của
                                khách hàng!
                            </Typography>
                        </Stack>
                        <Stack spacing={1} marginBottom={2}>
                            <Typography variant='body1' fontWeight={600}>
                                Mục tiêu
                            </Typography>
                            <Image src={goalImage} duration={300} alt='Mục tiêu' />
                            <Typography variant='body1'>
                                Chúng tôi thật sự tin tưởng vào sức mạnh khai triển của công nghệ và mong muốn góp phần
                                làm cho thế giới trở nên tốt đẹp hơn bằng việc tạo ra nhiều sản phẩm có giá trị cho cuộc
                                sống trong tương lai, MyStore sẽ cố gắng cải thiện hàng ngày để đáp ứng yêu cầu của
                                khách hàng một cách tốt nhất để trở thành một cửa hàng mua sắm trực tuyến tin dùng của
                                khách hàng!
                            </Typography>
                        </Stack>
                        <Stack spacing={1} marginBottom={2}>
                            <Typography variant='body1' fontWeight={600}>
                                Sản phẩm
                            </Typography>
                            <Typography variant='body1'>
                                Cửa hàng chúng tôi có nhiều mẫu các sản phẩm đa dạng như quần áo, dày dép, phụ kiện thời
                                trang cùng với nhiều thương hiệu nổi tiếng khác nhau,... và được cập nhập thường xuyên
                                để mang lại sự mới mẻ cho quý khách hàng khi mua hàng!
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Image duration={300} src={hotImage1} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Image duration={300} src={hotImage2} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Image duration={300} src={hotImage3} />
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack spacing={1} marginBottom={2}>
                            <Typography variant='body1' fontWeight={600}>
                                Đối tác
                            </Typography>
                            <Typography variant='body1'>
                                Khách hàng của chúng tôi là người duy nhất quyết định giá trị của hàng hóa và dịch vụ
                                của chúng tôi. Chúng tôi có gắng đáp ứng những nhu cầu chưa đáp ứng và những dich vụ
                                chưa được phục vụ tới quý khách hàng
                            </Typography>
                            <Image src={cooperation} width='500px' duration={300} alt='Mục tiêu' />
                            <Typography variant='body1'>
                                Khách hàng là bạn, bạn là đối tác của chúng tôi, hãy góp ý nếu chúng tôi thiếu xót, hãy
                                truyền tin nếu thấy chung tôi làm hay.
                            </Typography>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
            <NewLetters />
        </Box>
    )
}

export default AboutPage

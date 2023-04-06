import { AccessTime, Person2 } from '@mui/icons-material'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Icon, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showToast } from 'src/redux/slice/toastSlice'
import { getAllBlogs } from '~/api/main'

const ListPostsBlog = () => {
    const [listBlogs, setListBlogs] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllBlogs()
                setListBlogs(response.docs)
            } catch (error) {
                dispatch(showToast({ type: 'error', message: error.message }))
            }
        }
        fetchPosts()
    }, [dispatch])


    return (
        <Stack width={1400} margin='auto'>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant='h6' fontWeight={600}>Bài viết nổi bật</Typography>
                <Typography variant="subtitle2" component={Link} to="/" color="blue" >Xem thêm {'>>'}</Typography>
            </Stack>
            <Grid container marginBottom={5}>
                {listBlogs.map(item => (
                    <Grid item key={item._id} xs={3}>
                        <Card sx={{ maxWidth: 340 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.picture}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" minHeight={64} component="p">
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 4,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.desc}
                                    </Typography>
                                    <Typography marginTop={2} color="text.secondary" component="p" textAlign="right" fontSize={14} >Ngày đăng:
                                        <Typography fontSize={14} component="span" > {item.createdAt.split("T")[0]}
                                        </Typography>
                                    </Typography>

                                </CardContent>
                            </CardActionArea>

                            <Divider />
                            <CardActions>
                                <Button size="small" color="primary">
                                    Đọc
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid >
        </Stack>
    )
}

export default ListPostsBlog
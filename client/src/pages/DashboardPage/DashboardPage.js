import { Grid, Paper, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Divider, ListItem, ListItemAvatar, Avatar, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { HistoryEduOutlined, Inventory, ManageAccounts } from '@mui/icons-material'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { getDataByDashboardType } from '~/api/main'

const DashboardPage = () => {
    useDocumentTitle('Quản lý danh mục')
    const { managerId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const isAdmin = user?.isAdmin

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [selectedParam, setSelectedParam] = useState(managerId);

    const handleListItemClick = (event, path) => {
        setSelectedParam(path);
        navigate(`/dashboard/${path}`)

    };


    // Effects
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getDataByDashboardType(selectedParam)
                setData(response.docs)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchData()
    }, [selectedParam])
    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return (
        <Grid marginTop="40px" padding="0px" display='flex' justifyContent='center'>
            <Grid container spacing={4} className="dashboard-page">
                <Grid item xs={4}>
                    <Paper elevation={6}>
                        <List
                            component="nav"
                            aria-label="manager products blogs"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Danh mục quản lý
                                </ListSubheader>
                            }
                        >
                            <Divider />
                            <ListItemButton
                                selected={selectedParam === 'blogs'}
                                onClick={(event) => handleListItemClick(event, 'blogs')}
                            >
                                <ListItemIcon>
                                    <HistoryEduOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Tất cả bài viết" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedParam === 'products'}
                                onClick={(event) => handleListItemClick(event, 'products')}
                            >
                                <ListItemIcon>
                                    <Inventory />
                                </ListItemIcon>
                                <ListItemText primary="Sản phẩm" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedParam === 'users'}
                                onClick={(event) => handleListItemClick(event, 'users')}
                            >
                                <ListItemIcon>
                                    <ManageAccounts />
                                </ListItemIcon>
                                <ListItemText primary="Thông tin người dùng" />
                            </ListItemButton>
                            <Divider />
                        </List>
                        <ListItem
                            sx={{
                                padding: '0 16px'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={user?.picture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="#bdbdbd"
                                    >
                                        Người quản lý
                                    </Typography>
                                }

                            />

                        </ListItem>
                    </Paper>
                </Grid>
                <Grid item xs={8} >
                    <Paper elevation={6}>
                        {isLoading && <div>Loading...</div>}
                        <List>
                            {data?.map(item => (
                                <div key={item._id}>{item.name}</div>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardPage
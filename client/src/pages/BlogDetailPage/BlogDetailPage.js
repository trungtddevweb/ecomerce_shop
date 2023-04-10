import { useParams } from "react-router-dom"
import { Box, Grid } from '@mui/material'

const BlogDetailPage = () => {
    const { blogId } = useParams()
    return (
        <Grid container>{blogId}</Grid>
    )
}

export default BlogDetailPage
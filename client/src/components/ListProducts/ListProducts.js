import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useStyles from '~/assets/styles/useStyles'
import CardProductItem from '../CardProductItem'

const ListProducts = ({ query, title, ...props }) => {
    const classes = useStyles()
    const [lists, setLists] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            // try {
            //     const products = await
            // } catch (error) {
            //     console.error(error)
            // }
        }
        fetchProducts()
    }, [query])

    return (
        <Box display='flex' marginY={6} alignItems='center' flexDirection='column'>
            <Box width={1400}>
                <Typography color='primary.main' variant='h6'>
                    {title}
                </Typography>
                <Grid container>
                    <CardProductItem />
                </Grid>
            </Box>
        </Box>
    )
}

export default ListProducts

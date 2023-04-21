import { Box, Card, CardHeader, Grid, Stack, ListItem, Checkbox, CardContent, Typography } from '@mui/material'
import Image from 'mui-image'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LinearIndeterminate from 'src/fallback/LinearProgress/LinearProgress'
import { getAUserAPI } from '~/api/main'
import images from '~/assets/imgs'
import useStyles from '~/assets/styles/useStyles'

const CartItems = () => {
    const classes = useStyles()

    const [checked, setChecked] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.user.token)

    useEffect(() => {
        const fetchCartOfUser = async () => {
            setLoading(true)
            try {
                const user = await getAUserAPI(token)
                console.log(user.products[0].productId)
                setProducts(user.products)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
        }
        fetchCartOfUser()
    }, [token])

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const handleDelete = value => () => {
        const newProducts = products.filter(product => product.id !== value)
        setProducts(newProducts)
    }

    // console.log(products)
    return (
        <Box>
            <Grid container className='row d-flex justify-content-center my-4'>
                <Grid item className='col-md-8'>
                    <Card className='card mb-4'>
                        <CardHeader title='Giỏ hàng' className='card-header py-3' />
                        <CardContent>
                            {loading ? (
                                <LinearIndeterminate />
                            ) : products.length === 0 ? (
                                <Box className={classes.flexBox} flexDirection='column'>
                                    <Typography component='p' variant='h6'>
                                        Giỏ hàng rỗng.{' '}
                                        <Typography
                                            component={Link}
                                            className={classes.hoverItem}
                                            color='primary'
                                            to='/products'
                                            variant='h6'
                                        >
                                            Mua hàng ngay!
                                        </Typography>
                                    </Typography>
                                    <Image
                                        duration={500}
                                        shiftDuration={150}
                                        className='w-25'
                                        src={images.emptyFolder}
                                        alt='Null'
                                    />
                                </Box>
                            ) : (
                                products?.map(product => <div>{product.name}</div>)
                            )}
                        </CardContent>
                    </Card>
                    <div className='card mb-4'>
                        <div className='card-body'>
                            <p>
                                <strong>Expected shipping delivery</strong>
                            </p>
                            <p className='mb-0'>12.10.2020 - 14.10.2020</p>
                        </div>
                    </div>
                    <div className='card mb-4 mb-lg-0'>
                        <div className='card-body'>
                            <p>
                                <strong>We accept</strong>
                            </p>
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg'
                                alt='Visa'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg'
                                alt='American Express'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg'
                                alt='Mastercard'
                            />
                            <img
                                className='me-2'
                                width='45px'
                                src='https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp'
                                alt='PayPal acceptance mark'
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item className='col-md-4'>
                    <Card className='card mb-4'>
                        <CardHeader title='Tổng giá' className='card-header py-3' />
                        <div className='card-body'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                                    Products
                                    <span>$53.98</span>
                                </li>
                                <li className='list-group-item d-flex justify-content-between align-items-center px-0'>
                                    Shipping
                                    <span>Gratis</span>
                                </li>
                                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p className='mb-0'>(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span>
                                        <strong>$53.98</strong>
                                    </span>
                                </li>
                            </ul>
                            <button type='button' className='btn btn-primary btn-lg btn-block'>
                                Go to checkout
                            </button>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItems

// import { useState } from 'react'
// import {
//     List,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     ListItemSecondaryAction,
//     Checkbox,
//     IconButton,
//     Paper
// } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'

// const CartItems = () => {
//

//     return (
//         <Paper>
//             <List>
//                 {products.map(product => {
//                     const labelId = `checkbox-list-label-${product.id}`

//                     return (
//                         <ListItem key={product.id} role={undefined} dense button onClick={handleToggle(product.id)}>
//                             <ListItemAvatar>
//                                 <img src={product.image} alt={product.name} />
//                             </ListItemAvatar>
//                             <ListItemText
//                                 id={labelId}
//                                 primary={product.name}
//                                 secondary={`Price: ${product.price} | Quantity: ${product.quantity} | Brand: ${product.brand}`}
//                             />
//                             <ListItemSecondaryAction>
//                                 <Checkbox
//                                     edge='end'
//                                     checked={checked.indexOf(product.id) !== -1}
//                                     inputProps={{ 'aria-labelledby': labelId }}
//                                 />
//                                 <IconButton edge='end' aria-label='delete' onClick={handleDelete(product.id)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </ListItemSecondaryAction>
//                         </ListItem>
//                     )
//                 })}
//             </List>
//         </Paper>
//     )
// }

// export default CartItems

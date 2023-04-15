import { IconButton, Tooltip } from '@mui/material'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { setCart } from 'src/redux/slice/usersSlice'
import { addProductIdToCart } from '~/api/main'

const Cart = ({ onClick, ...props }) => {
    const cartCount = useSelector(state => state.auth.totalItems)
    const dispath = useDispatch()
    // console.log(useSelector(state => state.auth))
    // useEffect(() => {
    //     // const response = await addProductIdToCart()
    // }, [dispath, cartCount])

    return (
        <IconButton
            sx={{
                marginLeft: '12px'
            }}
            aria-label='cart'
            onClick={onClick}
            {...props}
        >
            <Tooltip title='Giỏ hàng'>
                <Badge badgeContent={cartCount} color='error'>
                    <ShoppingCartIcon color='info' />
                </Badge>
            </Tooltip>
        </IconButton>
    )
}

export default Cart

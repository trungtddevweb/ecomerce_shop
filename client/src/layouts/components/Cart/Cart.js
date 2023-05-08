import { IconButton, Tooltip } from '@mui/material'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'

const Cart = ({ onClick, ...props }) => {
    const cartCount = useSelector(state => state.auth.products.length)

    return (
        <IconButton
            sx={{
                sm: {
                    ml: '12px'
                }
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

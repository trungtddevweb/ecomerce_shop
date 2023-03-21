import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material"
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Cart = ({ onClick, ...props }) => {
    const [count, setCount] = useState(1);

    return (
        <IconButton sx={{
            marginLeft: '12px'
        }} aria-label="cart"
            onClick={onClick}
            {...props}
        >
            <Tooltip title="Giỏ hàng">
                <Badge badgeContent={count} color="error">
                    <ShoppingCartIcon color="info" />
                </Badge>
            </Tooltip>
        </IconButton>
    )
}

export default Cart
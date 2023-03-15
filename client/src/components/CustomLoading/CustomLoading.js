import { LoadingButton } from "@mui/lab"
import { Typography } from "@mui/material"

const CustomLoading = () => {
    return (
        <LoadingButton color="inherit" className='btn btn-primary' type='button' disabled>
            <Typography className='spinner-border spinner-border-sm' color="white" role='status' aria-hidden='true' />
        </LoadingButton>
    )
}

export default CustomLoading

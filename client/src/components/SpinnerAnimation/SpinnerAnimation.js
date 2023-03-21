import { Box } from "@mui/material"
import { Spinner } from "react-bootstrap"

const SpinnerAnimation = () => {
    return (
        <Box className="vw-100 vh-100 d-flex align-items-center justify-content-center">
            <Spinner />
        </Box>
    )
}

export default SpinnerAnimation
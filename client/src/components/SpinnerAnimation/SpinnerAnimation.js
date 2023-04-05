import { Box, CircularProgress } from "@mui/material"

const SpinnerAnimation = () => {
    return (
        <Box className="vw-100 vh-100 d-flex align-items-center justify-content-center">
            <CircularProgress />
        </Box>
    )
}

export default SpinnerAnimation
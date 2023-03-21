import { Stack, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }) {
    return (
        <Stack gap='20px' alignItems='center' marginTop='200px'>
            <Typography varian="h3">Something went wrong!</Typography>
            <Typography varian="h3">----------{'>'}</Typography>
            <Typography color='red' variant='body'>{error.message}</Typography>
            <Typography varian="h3">{'<'}----------</Typography>

        </Stack>
    )
}

const ErrorBoundaryCustom = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
                // log error and info to your error tracking service
                console.error(error);
                console.error(info);
            }}
            onReset={() => {
                // reset your app state here
            }}
        >
            {children}
        </ErrorBoundary>
    )


}

export default ErrorBoundaryCustom
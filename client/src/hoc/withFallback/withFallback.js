import { useState, Fragment, useEffect } from 'react'

export default function withFallback(WrappedComponent, FallbackComponent, LoadingComponent) {

    return function WithFallback(props) {
        const [error, setError] = useState(false);
        const [loading, setLoading] = useState(true)
        const handleError = () => setError(true);

        useEffect(() => {
            setLoading(false);
        }, []);

        if (error) {
            return <FallbackComponent />
        }

        if (loading) {
            return <LoadingComponent />
        }

        return (
            <Fragment>
                <WrappedComponent {...props} onError={handleError} />
            </Fragment>
        )
    }
}
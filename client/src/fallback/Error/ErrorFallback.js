import React from 'react'

const ErrorFallback = ({ error, ...props }) => {
    return (
        <>
            <div>Something went wrong!!!</div>
            <p>
                {error}
            </p>
        </>
    )
}

export default ErrorFallback
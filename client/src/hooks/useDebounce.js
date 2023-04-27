import { useState, useEffect } from 'react'

// This hook can be used to debounce a function call. It waits a certain amount of time before calling a function,
//  which can be useful when dealing with input fields or other situations
// where you don't want the function to be called too frequently.
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce

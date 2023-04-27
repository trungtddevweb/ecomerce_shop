import { useRef } from 'react'

const usePrevious = value => {
    const currentRef = useRef(value)
    const previousValue = useRef()

    if (currentRef.current !== value) {
        previousValue.current = currentRef.current
        currentRef.current = value
    }

    return previousValue.current
}

export default usePrevious

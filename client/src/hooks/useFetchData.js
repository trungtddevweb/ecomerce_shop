import { useState, useEffect } from 'react'
import mainAPI from '~/api/base'

const useFetchData = url => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await mainAPI.get(url)
                setData(response.data.docs)
                setIsLoading(false)
            } catch (error) {
                setErrors(error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { data, isLoading, errors }
}

export default useFetchData

import { useState, useEffect } from 'react'
import mainAPI from '~/api/base'

const useFetchData = url => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [totalDocs, setTotalDocs] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await mainAPI.get(url)
                setTotalDocs(response.data.totalDocs)
                setData(response.data.docs)
                setIsLoading(false)
            } catch (error) {
                setErrors(error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { data, isLoading, errors, totalDocs }
}

export default useFetchData

import { useState, useEffect } from 'react'
import mainAPI from '~/api/base'

const useFetchData = (url, options = {}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [totalDocs, setTotalDocs] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await mainAPI.get(url, options)
                setTotalDocs(response.data.totalDocs)
                setUser(response.data)
                setData(response.data.docs)
                setIsLoading(false)
            } catch (error) {
                setErrors(error)
                setIsLoading(false)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return { data, isLoading, errors, totalDocs, user }
}

export default useFetchData

import { useEffect } from 'react'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import Product from 'src/layouts/components/Product'
import Sliders from '~/components/Slider'

const HomePage = () => {
    useDocumentTitle('Trang chủ')

    // const [data, setData] = useState([])
    useEffect(() => {
        const fetchPost = async () => {
            try {
                // const res = await getAllProducts()
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [])
    return (
        <div>
            <Sliders />
            <Product />
        </div>
    )
}

export default HomePage

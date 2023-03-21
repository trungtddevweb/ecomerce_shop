import { useEffect } from 'react'
import Sliders from '~/components/Slider/Sliders'

const HomePage = () => {
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
            <div>Hello</div>
            <Sliders />
        </div>
    )
}

export default HomePage

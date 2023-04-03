import { useEffect, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDocumentTitle from 'src/hooks/useDocumentTitle'
import { showToast } from 'src/redux/slice/toastSlice'
// import { getToken } from 'src/utils/const'

const Sliders = lazy(() => import('~/components/Slider'))

const HomePage = () => {
    useDocumentTitle('Trang chủ')
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(showToast({ type: 'error', message: 'Hello world!' }));
    }
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
            <div>Hello</div>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}

export default HomePage

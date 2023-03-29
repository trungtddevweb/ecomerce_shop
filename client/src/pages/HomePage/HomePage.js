import { useEffect, lazy } from "react"
import { useSelector } from "react-redux"
import useDocumentTitle from "src/hooks/useDocumentTitle"
import { getToken } from "src/utils/const"

const Sliders = lazy(() => import('~/components/Slider'))


const HomePage = () => {
  useDocumentTitle('Trang chủ')
  // const token = useSelector(getToken)
  // console.log(token)


  // const [data, setData] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // const res = await getAllProducts()
      } catch (error) {
        console.error(error)
      }
    }
    fetchPost()
  }, [])
  return (
    <div>
      <Sliders />
      <div>Hello</div>
    </div>
  )
}

export default HomePage

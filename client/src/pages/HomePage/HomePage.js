import { useEffect, lazy } from "react"
import useDocumentTitle from "src/hooks/useDocumentTitle"

const Sliders = lazy(() => import('~/components/Slider'))


const HomePage = () => {
  useDocumentTitle('Trang chủ')

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

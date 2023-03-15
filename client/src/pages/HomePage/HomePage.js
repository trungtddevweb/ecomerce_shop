import { useEffect } from "react"
import useDocumentTitle from "src/hooks/useDocumentTitle"

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
      <div>Hello</div>
    </div>
  )
}

export default HomePage
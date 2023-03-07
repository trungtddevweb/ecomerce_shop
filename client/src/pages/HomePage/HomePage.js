import axios from "axios"
import { useEffect } from "react"
import { getAllProducts } from "~/api/main"
import { baseURL } from "src/utils/const"

const HomePage = () => {
  // const [data, setData] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getAllProducts()
      } catch (error) {

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
import { useEffect } from "react"
import { getAllProducts } from "~/api/main"

const HomePage = () => {


  console.log("Process", process.env.REACT_APP_BASE_URL)
  // const [data, setData] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getAllProducts()
        console.log("res", res)
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
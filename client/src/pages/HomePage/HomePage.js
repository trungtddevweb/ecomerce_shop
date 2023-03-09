import { useEffect } from "react"

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
    </div>
  )
}

export default HomePage
import axios from 'axios'
import { baseURL } from 'src/utils/const'

const mainAPI = axios.create({
    baseURL,
    timeout: 10_000
})

export default mainAPI

import axios from 'axios'
import { baseURL } from 'src/utils/const'

const mainAPI = axios.create({
    baseURL: baseURL,
    timeout: 10000,
})

export default mainAPI

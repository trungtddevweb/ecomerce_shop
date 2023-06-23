import axios from 'axios'
import { baseURL } from 'src/utils/const'

const mainAPI = axios.create({
    baseURL,
    timeout: 20_000
})

export default mainAPI

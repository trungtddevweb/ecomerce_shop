import axios from 'axios'
import { baseURL } from 'src/utils/const'

const token = localStorage.getItem('token')

const mainAPI = axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
        'Authorization': `Bearer ${token}`,
    }

})



export default mainAPI

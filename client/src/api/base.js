import axios from 'axios'

const baseURL = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
})

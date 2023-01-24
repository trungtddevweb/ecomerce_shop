import axios from "axios"

export const getProductByID = async (data) => {
    return axios.post(`${process.env.BASE_URL}`, data)
} 
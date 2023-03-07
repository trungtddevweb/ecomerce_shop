// import axios from "axios"

import mainAPI from "./base"

// export const getProductByID = async (data) => {
//     return axios.post(`${process.env.BASE_URL}`, data)
// } 

export const getAllProducts = async () => {
    const res = await mainAPI.get('/products')
    return res.data
}
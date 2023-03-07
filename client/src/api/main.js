import mainAPI from "./base"

export const getAllProducts = async () => {
    const res = await mainAPI.get('/products')
    return res.data
}


export const loginAPI = (data) => {
    return mainAPI.post("/auth/login", data)
}
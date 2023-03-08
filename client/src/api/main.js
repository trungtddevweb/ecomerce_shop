import mainAPI from "./base"

export const getAllProducts = async () => {
    const res = await mainAPI.get('/products')
    return res.data
}

export const registerAPI = (data) => {
    return mainAPI.post("/auth/register", data)
}

export const loginAPI = async (data) => {
    const response = await mainAPI.post("/auth/login", data)
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

export const logout = async () => {
    const res = await mainAPI.post('/auth/logout')
    if (res) {
        localStorage.removeItem('user')
    }
}
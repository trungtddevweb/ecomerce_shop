import mainAPI from "./base"

// Auth APIs
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

// Manage APIs
export const getDataByDashboardType = async (param) => {
    const res = await mainAPI.get(`${param}`)
    return res.data
}

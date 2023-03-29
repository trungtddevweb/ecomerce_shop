import mainAPI from "./base"

// Auth APIs
export const registerAPI = (data) => {
    return mainAPI.post("/auth/register", data)
}

export const loginAPI = async (data) => {
    const response = await mainAPI.post("/auth/login", data)
    if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token))
    }
    return response.data
}

export const logout = async (token) => {
    const res = await mainAPI.post('/auth/logout', {
        headers: {
            'Authorization': token
        }
    })
    // if (res) {
    //     localStorage.removeItem('token')
    // }
}

// Manage APIs
export const getDataByDashboardType = async (param) => {
    const res = await mainAPI.get(`${param}`)
    return res.data
}

import mainAPI from "./base"

// Auth APIs
export const registerAPI = async (data) => {
    return await mainAPI.post("/auth/register", data)
}

export const loginAPI = async (data) => {
    const response = await mainAPI.post("/auth/login", data)
    if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token))
    }
    return response.data
}

export const logout = async (token) => {
    try {
        const response = await mainAPI.post('/auth/logout', null, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response) {
            localStorage.removeItem('token')
        }
    } catch (error) {
        console.error(error)
    }
}

// Manage APIs
export const getAllUsers = async (token) => {
    const response = await mainAPI.get('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllProducts = async () => {
    const response = await mainAPI.get('/products')
    return response.data
}

export const getAllBlogs = async (token) => {
    const response = await mainAPI.get('/blogs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.data
}
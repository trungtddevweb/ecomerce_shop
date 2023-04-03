import mainAPI from "./base"

// Auth APIs
export const registerAPI = async (data) => {
    return await mainAPI.post("/auth/register", data)
}

export const loginAPI = async (data) => {
    const response = await mainAPI.post("/auth/login", data)
    if (response.data.token) {
        localStorage.setItem("token", response.data.token)
    }
    return response.data
}

export const logout = async (token) => {
    try {
        const response = await mainAPI.post('/auth/logout', null, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.data.success) {
            localStorage.removeItem('token')
        }
    } catch (error) {
        console.error(error)
    }
}

// Manage APIs
export const getAllUsers = async () => {
    const response = await mainAPI.get('/users')
    return response.data
}

export const getAllProducts = async () => {
    const response = await mainAPI.get('/products')
    return response.data
}

export const getAllBlogs = async () => {
    const response = await mainAPI.get('/blogs')
    return response.data
}

// Deleted array of products
export const deleteProductByIdAPI = async (token, selectedItem) => {
    return await mainAPI.delete('/products', {
        headers: {
            'Authorization': `Bearer ${token}`,

        },
        data: {
            selectedIds: selectedItem
        }
    })

}
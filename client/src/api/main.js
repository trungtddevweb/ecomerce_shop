import mainAPI from './base'

// Auth APIs
export const registerAPI = async data => {
    return await mainAPI.post('/auth/register', data)
}

export const loginAPI = async data => {
    const response = await mainAPI.post('/auth/login', data)
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
    }

    return response.data
}

export const logout = async token => {
    try {
        const response = await mainAPI.post('/auth/logout', null, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.success) {
            localStorage.removeItem('token')
        }
        return response
    } catch (error) {
        return console.error(error)
    }
}

export const getAUserAPI = async token => {
    const user = await mainAPI.get('/users/find/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return user.data
}

// Manage APIs
export const getAllUsers = async token => {
    const response = await mainAPI.get('/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllProducts = async () => {
    const response = await mainAPI.get('/products')
    return response.data
}

export const getAllBlogs = async () => {
    const response = await mainAPI.get('/blogs?limit=4&page=1', {})
    return response.data
}

// Deleted array of products
export const deleteItemByParams = async (params, token, selectedItem) => {
    return await mainAPI.delete(`/${params}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            selectedIds: selectedItem
        }
    })
}

export const removeProductIdFromCartAPI = async (productIds, token) => {
    const res = await mainAPI.patch(
        '/users/remove-mutiple',
        { productIds },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res
}

// PRODUCT APIs
// GET A PRODUCT
export const getProductByIdAPI = async productId => {
    const response = await mainAPI.get(`/products/find/${productId}`)
    return response.data
}

// Add productId to cart
export const addProductIdToCartAPI = async (token, data) => {
    return await mainAPI.post('/users/add', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// Get products by hot
export const getProductsByHot = async (limit, page) => {
    const response = await mainAPI.get(`/products/search/hots?limit=${limit}&page=${page}`)
    return response.data
}

// Get product by field
export const getProductByFieldAPI = async (fields, value, limit, page) => {
    const response = await mainAPI.get(`/products/fields/search/?${fields}=${value}&limit=${limit}&page=${page}`)
    return response.data
}

// Order
export const orderProductAPI = async (token, orderDetails) => {
    return await mainAPI.post('/order', orderDetails, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

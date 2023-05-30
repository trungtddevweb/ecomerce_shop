import axios from 'axios'
import mainAPI from './base'
import { locationURL } from 'src/utils/const'

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
        if (response) {
            localStorage.removeItem('token')
        }
    } catch (error) {
        console.error(error)
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

export const updatedUserAPI = async (data, token) => {
    return await mainAPI.patch('/users/update-user', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatedUserByAdminAPI = async (data, token) => {
    const res = await mainAPI.patch('/users/update-user/admin', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

export const getAllProducts = async (limit, page) => {
    const response = await mainAPI.get(`/products?limit=${limit}&page=${page}`)
    return response.data
}

export const getAllProductByQueryAPI = async (limit, url) => {
    const query = url.split('?')[1]
    const res = await mainAPI.get(`/products?limit=${limit}&${query}`)
    return res.data
}

export const getRandomProductsAPI = async num => {
    return await mainAPI.get(`/products/random?num=${num}`)
}

// Blogs
export const getAllBlogs = async (limit, pageSize) => {
    const response = await mainAPI.get(`/blogs?limit=${limit}&page=${pageSize}`, {})
    return response.data
}

// Updated A Blog
export const updatedBlogAPI = async (updateFields, token) => {
    return await mainAPI.put('/blogs', updateFields, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchBlogsByQuery = async query => {
    const response = await mainAPI.get(`/blogs/search?title=${query}`)
    return response.data
}

export const getABlogPostAPI = async blogId => {
    const response = await mainAPI.get(`/blogs/find/${blogId}`)
    return response.data
}

export const createBlogAPI = async (data, token) => {
    return await mainAPI.post('/blogs', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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
    return await mainAPI.patch(
        '/users/remove-mutiple',
        { productIds },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
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

// Creata a Product
export const createProductAPI = async (data, token) => {
    return await mainAPI.post('/products', data, {
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

// Updated Products API
export const updatedProductAPI = async (updateFields, token) => {
    return await mainAPI.put('/products', updateFields, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// Order
export const orderProductAPI = async (token, orderDetails) => {
    return await mainAPI.post('/orders', orderDetails, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const cancelOrderAPI = async (orderCode, token) => {
    return await mainAPI.post(
        '/orders/user-cancel',
        { orderCode },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const updateOrderByAdminAPI = async (data, token) => {
    return await mainAPI.patch('/orders', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// Stripe
export const gePublicKey = async () => {
    const res = await mainAPI.get('/stripe/config')
    return res.data
}

export const getClientSecret = async products => {
    const res = await mainAPI.post('/stripe/create-checkout-session', { products })
    return res.data
}

// Orders
export const getOrderByUserIdAPI = async (token, limit, pageSize) => {
    return await mainAPI.get(`/orders/?limit=${limit}&page=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//Voucher
export const createVoucherAPI = async (data, token) => {
    const response = await mainAPI.post('/vouchers', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAVoucherAPI = async (voucherCode, token) => {
    return await mainAPI.post('/vouchers/find', { voucherCode }, { headers: { Authorization: `Bearer ${token}` } })
}

export const getAllVouchersAPI = async (limit, pageSize, token) => {
    const response = await mainAPI.get(`/vouchers/all-vouchers?limit=${limit}&page=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllOrdersAPI = async (limit, page, token) => {
    const response = await mainAPI.get(`/orders/all-order?limit=${limit}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAllProductsInFlashSaleAPI = async (limit, page, token) => {
    const response = await mainAPI.get(`/products/flash-sale/products?limit=${limit}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const createFlashSaleAPI = async (data, token) => {
    return await mainAPI.post('/products/flash-sale/create', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeProductFromSaleAPI = async (token, selectedItem) => {
    return await mainAPI.delete('/products/flash-sale/products', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            selectedIds: selectedItem
        }
    })
}

// Update voucher
export const updatedVoucherAPI = async (payload, token) => {
    const res = await mainAPI.patch('/vouchers/', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}

// Location
export const getLocationAPI = async () => {
    return await axios.get(`${locationURL}/p`)
}

export const getDistrictsAPI = async code => {
    return await axios.get(`${locationURL}/p/${code}?depth=2`)
}

export const getWardsAPI = async code => {
    return await axios.get(`${locationURL}/d/${code}?depth=2`)
}

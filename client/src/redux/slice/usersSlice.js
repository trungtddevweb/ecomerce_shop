import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    error: false,
    user: null,
    products: [],
    totalItems: 0
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
            state.products = action.payload.userInfo.products
            state.totalItems = action.payload.userInfo.totalItems
            state.error = null
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false
            state.user = null
            state.error = action.payload
        },
        logoutSuccess: state => {
            state.isAuthenticated = false
            state.user = null
            state.error = null
            state.products = []
            state.totalItems = 0
        },
        updateCart: (state, action) => {
            // state.totalItems = action.payload.totalItems
            // state.products = action.payload.products
            console.log('totalItems', action.payload.totalItems)
            console.log('products', action.payload.products)
        }
    }
})

export const { loginSuccess, loginFailed, logoutSuccess, removeProductFromCart, updateCart, clearCart } =
    userSlice.actions

export default userSlice.reducer

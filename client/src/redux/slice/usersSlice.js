import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    error: false,
    user: null,
    products: []
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
        },
        addProductToCart: (state, action) => {
            state.products = action.payload.products
        },
        removeProductFromCart: (state, action) => {
            const { productIds } = action.payload
            productIds.forEach(productId => {
                state.products = state.products.filter(product => product.productId !== productId)
            })
        },
        clearCart: state => {
            state.products = []
        }
    }
})

export const { loginSuccess, loginFailed, logoutSuccess, removeProductFromCart, addProductToCart, clearCart } =
    userSlice.actions

export default userSlice.reducer

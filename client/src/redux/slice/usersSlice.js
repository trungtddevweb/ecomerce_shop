import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    error: false,
    user: null,
    products: [],
    totalItems: 0,
    totalPrice: 0
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
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
        },
        addProductToCart: (state, action) => {
            const product = action.payload
            const existingProduct = state.products.find(p => p._id === product._id)
            if (existingProduct) {
                existingProduct.quantity++
            } else {
                state.products.push({ ...product, quantity: 1 })
            }
            state.totalItems++
            state.totalPrice += product.price
        },
        removeProductFromCart(state, action) {
            const productId = action.payload
            const existingProduct = state.products.find(p => p._id === productId)
            if (!existingProduct) {
                return
            }
            if (existingProduct.quantity === 1) {
                state.products = state.products.filter(p => p._id !== productId)
            } else {
                existingProduct.quantity--
            }
            state.totalItems--
            state.totalPrice -= existingProduct.price
        },
        clearCart: state => {
            state.products = []
            state.totalQuantity = 0
            state.totalPrice = 0
        }
    }
})

export const { loginSuccess, loginFailed, logoutSuccess, addProductToCart, removeProductFromCart, clearCart } =
    userSlice.actions

export default userSlice.reducer

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
        }
    }
})

export const { loginSuccess, loginFailed, logoutSuccess, addProductToCart, removeProductFromCart, clearCart } =
    userSlice.actions

export default userSlice.reducer

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
        addProductToCart: (state, action) => {
            state.products = action.payload.products
            console.log('add', action.payload.products)
        },
        updateTotalItems: (state, action) => {
            state.totalItems = action.payload.totalItems
            console.log('update', action.payload.totalItems)
        }
        // },
        // addProductToCart(state, action) {
        //     // const product = action.payload
        //     // const existingProduct = state.products.find(p => p.id === product.id)
        //     // if (existingProduct) {
        //     //     existingProduct.quantity++
        //     // } else {
        //     //     state.products.push({ ...product, quantity: 1 })
        //     // }
        //     // state.totalItems++
        //     // state.totalPrice += product.price
        //     mainAPI
        //         .patch('/users/add', { productId: action.payload })
        //         .then(response => {
        //             state.products = response.data.products
        //             state.totalItems = response.data.totalItems
        //         })
        //         .catch(error => console.log(error))
        // },
        // removeProductFromCart(state, action) {
        //     const productId = action.payload
        //     const existingProduct = state.products.find(p => p.id === productId)
        //     if (existingProduct) {
        //         if (existingProduct.quantity === 1) {
        //             state.products = state.products.filter(p => p.id !== productId)
        //         } else {
        //             existingProduct.quantity--
        //         }
        //         state.totalItems--
        //         state.totalPrice -= existingProduct.price
        //     }
        // }
    }
})

export const {
    loginSuccess,
    loginFailed,
    logoutSuccess,
    removeProductFromCart,
    addProductToCart,
    updateTotalItems,
    clearCart
} = userSlice.actions

export default userSlice.reducer

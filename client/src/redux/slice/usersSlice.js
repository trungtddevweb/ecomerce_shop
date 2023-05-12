import { createAction, createSlice } from '@reduxjs/toolkit'

export const login = createAction('auth/login')

const initialState = {
    user: null,
    products: [],
    info: null
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutSuccess: state => {
            state.user = null
            state.products = []
            state.info = null
        },
        updatedUser: (state, action) => {
            state.info = action.payload
        },
        addProductToCart: (state, action) => {
            state.products = action.payload.products
        },
        removeProductFromCart: (state, action) => {
            const { productIds } = action.payload
            productIds.forEach(productId => {
                state.products = state.products.filter(product => product._id !== productId)
            })
        },
        clearCart: state => {
            state.products = []
        }
    },
    extraReducers: builder => {
        builder.addCase(login, (state, action) => {
            state.user = action.payload
            state.info = action.payload.userInfo
            state.products = action.payload.userInfo.products
        })
    }
})

export const { logoutSuccess, removeProductFromCart, addProductToCart, clearCart, updatedUser } = userSlice.actions

export default userSlice.reducer

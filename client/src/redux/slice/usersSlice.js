import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    error: false,
    user: null,
    cartCount: [],
};

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
            state.error = null
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        addToCart: (state, action) => {
            state.cartCount += action.payload;
        },
        removeToCart: (state, action) => {
            state.cartCount -= action.payload;
        }

    },
});

export const { loginSuccess, loginFailed, logoutSuccess, addToCart, removeToCart } =
    userSlice.actions;

export default userSlice.reducer;
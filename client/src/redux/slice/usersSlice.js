import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogin: null,
    loading: false,
    error: false,
    cartCount: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.userLogin = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.userLogin = null;
            state.loading = false;
            state.error = false;
        },
        addToCart: (state, action) => {
            state.cartCount += action.payload;
        },
        removeToCart: (state, action) => {
            state.cartCount -= action.payload;
        }

    },
});

export const { loginStart, loginSuccess, loginFailure, logout, addToCart, removeToCart } =
    userSlice.actions;

export default userSlice.reducer;
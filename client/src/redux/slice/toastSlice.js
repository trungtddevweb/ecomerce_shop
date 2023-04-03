import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {},
    reducers: {
        showToast(state, action) {
            const { type, message, options } = action.payload;
            toast[type](message, options);
        },
    },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
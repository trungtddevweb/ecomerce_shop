import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        title: '',
        message: '',
        onConfirm: () => {}
    },

    reducers: {
        showDialog(state, action) {
            const { title, message, onConfirm } = action.payload
            state.open = true
            state.title = title
            state.message = message
            state.onConfirm = onConfirm
        },
        hideDialog(state) {
            state.open = false
        }
    }
})

export const { showDialog, hideDialog } = dialogSlice.actions
export default dialogSlice.reducer

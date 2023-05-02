import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        title: '',
        message: ''
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
            state.title = ''
            state.message = ''
            state.onConfirm = undefined
        }
    }
})

export const { showDialog, hideDialog } = dialogSlice.actions
export default dialogSlice.reducer

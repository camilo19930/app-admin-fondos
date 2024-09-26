import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    username: '',
    email: ''
}

export const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {
        getFund: (state, action) => {
            const {name, username, email} = action.payload;
            state.name = name;
            state.username = username;
            state.email = email;
        },
        changeEmail: (state, action) => {
            state.email = action.payload
        }
    }
})
export const {getFund, changeEmail} = fundSlice.actions;
export default fundSlice.reducer;
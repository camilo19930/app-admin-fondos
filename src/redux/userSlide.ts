import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: '',
    email: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {id, name, email} = action.payload;
            state.id = id;
            state.name = name;
            state.email = email;
        }
    }
})
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
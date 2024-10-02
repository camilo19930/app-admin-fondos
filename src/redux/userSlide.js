import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [],
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.users = action.payload;
        }
    }
});
export const { getUser } = userSlice.actions;
export default userSlice.reducer;

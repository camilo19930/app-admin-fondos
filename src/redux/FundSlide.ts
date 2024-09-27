import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    funds: [],
};

export const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {
        getFund: (state, action) => {
            state.funds = action.payload;  // Aquí solo guardamos los datos serializables
        }
    }
})
export const { getFund } = fundSlice.actions;
export default fundSlice.reducer;
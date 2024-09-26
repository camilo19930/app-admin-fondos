import { configureStore } from "@reduxjs/toolkit";
import  fundReducer  from "./FundSlide";
import  userReducer  from "./userSlide";

export const store = configureStore({
    reducer: {
        fund: fundReducer,
        user: userReducer
    }
})
import { configureStore } from "@reduxjs/toolkit";
import fundReducer from "./FundSlide";
import userReducer from "./userSlide";
import authReducer from "./authSlice";
export const store = configureStore({
    reducer: {
        fund: fundReducer,
        user: userReducer,
        auth: authReducer,
    }
});

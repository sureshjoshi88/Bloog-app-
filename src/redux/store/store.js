import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../loginSlice/loginSlice";

export const store = configureStore({
    reducer: loginSlice
})
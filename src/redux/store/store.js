import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../loginSlice/loginSlice";
import getBlogSlice from "../userSlice/getBlog"

export const store = configureStore({
    reducer: {
        auth:loginSlice,
        allBlogs:getBlogSlice
    }
})

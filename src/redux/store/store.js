import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../loginSlice/loginSlice";
import getBlogSlice from "../userSlice/getBlog"
import addBlogSlice from "../userSlice/addBlog"
import updateBlogSlice from '../userSlice/updateBlog'

export const store = configureStore({
    reducer: {
        auth:loginSlice,
        allBlogs:getBlogSlice,
        addBlogs:addBlogSlice,
        updateBlog:updateBlogSlice,
    }
})

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const updateBlog = createAsyncThunk('addblog', async (id,data, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token;
        const response = await axios.post(`http://localhost:8000/api/blogs/blog${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message);

    }

})

const updateBlogSlice = createSlice({
    name: "updateblog",
    initialState: {
        blog: [],
        isloading: false,
        iserror: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.blog = action.payload;
                state.iserror = null;
                state.isloading = false;
            })
            .addCase(updateBlog.pending, (state) => {
                state.iserror = null;
                state.isloading = true;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.iserror = action.payload;
                state.isloading = false;
            })

    }
})

export default updateBlogSlice.reducer
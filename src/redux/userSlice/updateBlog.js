import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const addBlog = createAsyncThunk('addblog', async (data, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token;
        const response = await axios.post(`http://localhost:8000/api/blogs/blog`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message);

    }

})

const addBlogSlice = createSlice({
    name: "addblog",
    initialState: {
        blog: [],
        isloading: false,
        iserror: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.fulfilled, (state, action) => {
                state.blog = action.payload;
                state.iserror = null;
                state.isloading = false;
            })
            .addCase(addBlog.pending, (state) => {
                state.iserror = null;
                state.isloading = true;
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.iserror = action.payload;
                state.isloading = false;
            })

    }
})

export default addBlogSlice.reducer
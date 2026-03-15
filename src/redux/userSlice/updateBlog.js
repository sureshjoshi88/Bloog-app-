import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const updateBlog = createAsyncThunk('addblog', async ({ id, data }, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token;
        const response = await axios.put(`http://localhost:8000/api/blogs/blog/${id}`, data, {
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
        success: false,
        isloadings: false,
        iserrors: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.success = true;
                state.iserrors = null;
                state.isloadings = false;
            })
            .addCase(updateBlog.pending, (state) => {
                state.iserrors = null;
                state.isloadings = true;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.iserrors = action.payload;
                state.isloadings = false;
            })

    }
})

export default updateBlogSlice.reducer
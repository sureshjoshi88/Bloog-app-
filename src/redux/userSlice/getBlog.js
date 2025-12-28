import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getBlog = createAsyncThunk('blog', async (search, { rejectWithValue ,getState}) => {
    try {
              const token = getState().auth.token;
        const response = await axios.get(`http://localhost:8000/api/blogs/blog?title=${search}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message);

    }

})

const getBlogSlice = createSlice({
    name: "blog",
    initialState: {
        blog: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlog.fulfilled, (state, action) => {
                state.blog = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getBlog.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
})

export default getBlogSlice.reducer
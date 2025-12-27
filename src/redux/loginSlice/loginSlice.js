import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/login", formData);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }

});


const loginSlice = createSlice({
    name: "loginUser",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null,
                    state.user = action.payload.user,
                    state.token = action.payload.token,
                    localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

    }
})

export const { logout } = loginSlice.actions;
export default loginSlice.reducer
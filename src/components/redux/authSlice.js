import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const backendURL = 'http://127.0.0.1:8000/api';

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
            const response = await axios.post(`${backendURL}/register`,
                { name, email, password },
                config);

            localStorage.setItem('token', response.data.token);
            if (response.status === 201) {
                window.location.href = '/login'
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const login = createAsyncThunk('auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
            const response = await axios.post(`${backendURL}/login`,
                { email, password },
                config);


            if (response.status === 200) {
                const token = localStorage.setItem('token', response.data.token);
                alert('logged in')
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error.message)
        }
    })
export const logout = createAsyncThunk('auth/logout',
    async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            await axios.post(`${backendURL}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    'Accept': "application/json",
                  }
            });
            localStorage.removeItem("token");
            console.log(token)
            window.location.href = "/login";
        } catch (error) { console.log(error.message) }
    })
const initialState = {

    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
};



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.
            addCase(registerUser.pending, (state) => {

                state.loading = true
                state.error = null
            })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {

            state.loading = false
            state.success = true
        })
        builder.addCase(registerUser.rejected, (state, { payload }) => {

            state.loading = false
            state.error = payload
        })

        builder.addCase(logout.fulfilled, (state, { payload }) => {
            return ;
        })

        //reducer for login action

        builder.
            addCase(login.pending, (state) => {

                state.loading = true
                state.error = null
            })
        builder.addCase(login.fulfilled, (state, { payload }) => {

            state.loading = false
            state.success = true
        })
        builder.addCase(login.rejected, (state, { payload }) => {

            state.loading = false
            state.error = payload
        })
    }
})


export default authSlice.reducer
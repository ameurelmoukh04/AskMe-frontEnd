import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { backendURL } from './authSlice';
const initialState = {
  answers: [],
  loading: false,
  error: null
};

export const fetchAnswers = createAsyncThunk(
  'answers/fetchAnswers',
  async (questionId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      }
      const response = await axios.get(`${backendURL}/questions/${questionId}/answers`, config)

      return response.data;

    } catch (error) { console.log(error.message); }
  }
)

export const addAnswer =createAsyncThunk(
  'answer/addAnswer', async ({data, rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      const response = await axios.post(`${backendURL}/questions/${data.questionId}/answers`,
                                          {data},
                                          config)
    }catch(error){console.log(error.message)}
    console.log(response.data)
  
  }

)
export const answerSlice = createSlice({
  name: 'answerSlice',
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder
    .addCase(fetchAnswers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAnswers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.answers = payload;
    })
    .addCase(fetchAnswers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })

    
    builder.addCase(addAnswer.fulfilled,(state,{payload}) =>{

      state.answers = payload
    }
    )
  }
})


export const { increment } = answerSlice.actions

export default answerSlice.reducer
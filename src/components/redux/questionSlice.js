import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { backendURL } from './authSlice';


export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions', async (_,
    { getState,rejectWithValue}) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }
    const state = getState()
    if (state.questionSlice.questions.length > 0) {
      return rejectWithValue("Questions already loaded");
  }
    const response = await axios.get(`${backendURL}/questions`, config)

    return response.data
  }
  catch (error) {
    console.log(error.message);
  }


}
);


export const addQuestion = createAsyncThunk(
  'question/addQuestion',
  async ({ content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        alert('not authenticated yet')
        return;
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      const response = await axios.post(`${backendURL}/questions`,
        { content },
        config);
      console.log(response.status, response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
)

const initialState= {
  questions: [],
  loading: false,
  success: false,
  error: null,
}
export const questionSlice = createSlice({
  name: 'questionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      state.questions = payload;
      state.loading = false;
      state.success = true;
      console.log(state.questions);
    })

    //adding a question builder

    builder.addCase(addQuestion.fulfilled, (state, { payload }) => {

      state.loading = false
      state.success = true
    })
  }
})


export const {  } = questionSlice.actions

export default questionSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import answerSlice from './answerSlice'
import questionSlice from './questionSlice'
import authSlice from './authSlice'

export const store = configureStore({
    reducer: {

        questionSlice: questionSlice,
        answerSlice: answerSlice,
        auth: authSlice
    }
})
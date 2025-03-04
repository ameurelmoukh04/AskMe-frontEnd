import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import image from '../../assets/react.svg'
import { addQuestion } from '../redux/questionSlice';
import { backendURL } from '../redux/authSlice';

const WhatDoYouWantToAsk = () => {
  const {register,handleSubmit} = useForm();
  const token = localStorage.getItem('token')
  const storedUser = useSelector((state)=> state.auth);
  
  const username = localStorage.getItem('username');
  const submitForm = async (data) =>{
    
    try {
      const token = localStorage.getItem('token');
      if(!token) navigate('/');
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
      const response = await axios.post(`${backendURL}/questions`,
        { content : data.content },
        config);
      console.log(response.status, response.data)
    } catch (error) {
      console.log(error.message)
    }
    alert('question posted')
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-2xl mt-5">
      

          
        <form onSubmit={handleSubmit(submitForm)} className='flex items-center'>

          <input
            type="text" {...register('content')}
            placeholder={'what do you think'+' '+username + '?'}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        <button type='submit' className="bg-blue-500 text-black flex-2 px-4 py-2 rounded-full hover:bg-blue-600 transition" >
          Ask
        </button>
        </form>
      
    </div>
  );
}

export default WhatDoYouWantToAsk
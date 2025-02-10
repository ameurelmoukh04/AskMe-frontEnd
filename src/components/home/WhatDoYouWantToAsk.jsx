import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import image from '../../assets/react.svg'
import { addQuestion } from '../redux/questionSlice';

const WhatDoYouWantToAsk = () => {
  const {register,handleSubmit} = useForm();
  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  
  const submitForm = (data) =>{
    if(!token){
      alert('not logged in');
      return;
    }
    dispatch(addQuestion(data))
    alert('question posted')
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-2xl mt-5">
      <div className="flex items-center gap-3">

          <img
            src={image}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        <form onSubmit={handleSubmit(submitForm)}>

          <input
            type="text" {...register('content')}
            placeholder="What do you think?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        <button type='submit' className="bg-blue-500 text-black px-4 py-2 rounded-full hover:bg-blue-600 transition" >
          Ask
        </button>
        </form>
      </div>
    </div>
  );
}

export default WhatDoYouWantToAsk
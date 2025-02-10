import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Navbar from '../commun/navbar/Navbar';
import { addQuestion } from '../redux/questionSlice';

const CreateQuestion = () => {
    const {register,handleSubmit} = useForm();
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    
    const submitForm = (data) =>{
        dispatch(addQuestion(data))
    }
  return (
    <div>
        <Navbar />
        {token ?
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4">
                <div>
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">Question :</label>
                    <input type='text' {...register('content')} required placeholder="Type your question..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <input type="submit" value='submit' className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"/>
            </form>
            </div>
        :<h1 className='inline-block m-auto'>you are not authenticated</h1>}
    </div>
  )
}

export default CreateQuestion
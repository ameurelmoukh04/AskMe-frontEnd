import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../commun/navbar/Navbar';
import { registerUser } from '../redux/authSlice';

const Register = () => {


    const { loading, userInfo, error, success } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const { register, handleSubmit } = useForm();

    const submitForm = (data) => {
        if (data.password !== data.confirmpassword) {
            alert('password missmatch')
        }

        data.email = data.email.toLowerCase();
        dispatch(registerUser(data))
    }
    return (
        <>
        <Navbar />
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Register</h2>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <label htmlFor='name' className='block text-gray-700'>Name : </label>

                            <input
                                type='text' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='enter your Name'
                                {...register('name')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block text-gray-700'>Email : </label>

                            <input
                                type='email' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='enter your Email'
                                {...register('email')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-gray-700'>Password : </label>
                            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='enter your password'
                                type='password'
                                {...register('password')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='confirmpassword' className='block text-gray-700'>Confirm Password : </label>

                            <input
                                type='password' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your Password"
                                {...register('confirmpassword')}
                                required
                            />
                        </div>
                        <button type='submit' className='button'>
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register
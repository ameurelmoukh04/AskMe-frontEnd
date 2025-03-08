import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../commun/navbar/Navbar';
import { login } from '../redux/authSlice';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { register, handleSubmit } = useForm();

    const submitForm = (data) => {
        dispatch(login(data)).then(navigator('/'))
    }
    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>
                    <form onSubmit={handleSubmit(submitForm)} className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-gray-700'>Email :</label>

                            <input
                                type='email'  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                {...register('email')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-gray-700'>Password :</label>
                            <input
                                type='password'  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Password"
                                {...register('password')}
                                required
                            />
                        <p>don't have an account?<Link to='/register'>Register Now</Link></p>
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

export default Login
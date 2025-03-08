import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/authSlice' 
import logo  from '../../../assets/react.svg'
const Navbar = () => {
    const dispatch =useDispatch();
  const token = localStorage.getItem('token');
  return (
    <nav className='flex flex-row items-center justify-between sm:block'>
        <Link to={'/'} className='w-30 text-3xl'>AskMe</Link>
      <div className='linkContainer'>
        <Link className='hidden sm:block' to={'/profile'} >Profile</Link>
        <Link className='p-4' to={'/questions/create'}>Ask Question</Link>
        {token ?
        <button className='' onClick={()=>dispatch(logout())}>Log out</button> : <Link to={'/login'}>Login</Link>
      }
      </div>
    </nav>
  
  )
}

export default Navbar
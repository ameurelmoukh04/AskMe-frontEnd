import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import './navbar.css'
const Navbar = () => {
    const dispatch =useDispatch();
  const token = localStorage.getItem('token');
  return (
    <>
    <nav className='container'>
      <div>
        <h1 href=""><Link to={'/'}>AskMe</Link></h1>
      </div>
      <div className='linkContainer'>
        <Link to={'/profile'} >Profile</Link>
        <button><Link to={'/questions/create'}>Ask Question</Link></button>
        {token ?
        <button onClick={()=>dispatch(logout())}>Log out</button> : <Link to={'/login'}>Login|Register</Link>
      }
      </div>
    </nav>
    
    </>
  
  )
}

export default Navbar
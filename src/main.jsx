import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './components/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/login/Register'
import CreateQuestion from './components/createQuestion/CreateQuestion'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/questions/create' element={<CreateQuestion />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

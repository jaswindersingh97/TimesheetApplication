import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

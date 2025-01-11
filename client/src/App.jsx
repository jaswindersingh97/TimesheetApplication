import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

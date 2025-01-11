import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import TaskPage from './pages/TaskPage/TaskPage';
import AddUsers from './pages/AddUsers/AddUsers';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/TaskPage' element={<TaskPage/>}/>
        <Route path='/addUsers' element={<AddUsers/>}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

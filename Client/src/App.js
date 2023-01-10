import './App.css';
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/loginreg/login';
import Profile from './pages/Profile/profile';
import Register from './pages/loginreg/registration';
import Home from './pages/Home/Home';
import { useSelector } from 'react-redux';

function App() {
  const user =useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={user?<Home/>: <Navigate to="/login"/>}/>
      <Route path='/login' element={user?<Home/>:<Login/>}/>
      <Route path='/register' element={user?<Home/>:<Register/>}/>
      <Route path='/profile/:id' element={user?<Profile/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

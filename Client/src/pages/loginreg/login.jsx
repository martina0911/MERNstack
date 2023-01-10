import React, {useState} from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { logIn } from '../../Action/AuthAction';
import {useDispatch} from 'react-redux';

function Login() {
  const [data,setData]=useState({email:"",password:""});
  const dispatch = useDispatch();
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }


  //get data from database
  const handleSubmit=(e)=>{
    e.preventDefault();   
    dispatch(logIn(data));
    
  }
  return (
    <div className="Login">
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange}/>
                <input type="password" name="password" id="password1" className='pass1' placeholder='Password' onChange={handleChange}/> <br/> <br/>
                <input type="submit" id='submit' value="Login" placeholder='Login' /><br/><br/>

                <p>Don't have an account? <Link to="/register">Register!</Link></p> 
            </form>
        </div>

    </div>
  );
}

export default Login;

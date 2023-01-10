import React, { useState } from 'react';
import './registration.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { signUp } from '../../Action/AuthAction';

function Register() {  
  const [confirmPass,setConfirmPass]=useState(true);
  const dispatch = useDispatch();
  const [data,setData]=useState({firstname:"",lastname:"",email:"",username:"",password:"",confirmpassword:""});
   
  

  //set data values
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  //send data to database
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(data.password!==data.confirmpassword){
      setConfirmPass(false);
    }else{
      dispatch(signUp(data));
    }
  }
  return (
    
    <div className="Register">
      
        <div className="register-form">
         
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstname" id="first-name" placeholder='First Name' onChange={handleChange}/>
                <input type="text" name="lastname" id="last-name" placeholder='Last Name' onChange={handleChange}/>
                <input type="text" name="username" id="username" placeholder='Username'onChange={handleChange} />
                <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange}/>
                <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange}/>
                <input type="password" name="confirmpassword" id="confirm-password" placeholder='Confirm Password'onChange={handleChange} />
                <span style={{display: confirmPass? "none":"block", color:"red",fontSize:"15px",float:"right",marginRight:"20px"}}>* Passwords don't match</span> <br/> <br/>
                <input type="submit" id='submit' value="Register" placeholder='Register' /><br/><br/>

                <p>Already have an account? <Link to='/login'>Login!</Link></p>
            </form>
        </div>

    </div>
  );
}

export default Register;
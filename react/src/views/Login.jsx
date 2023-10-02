import React, { useState } from 'react'
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from '../context/ContextProvider.jsx';


function Login() {

  const [formValue,setform] =useState({
    email:'',
    password:'',
  })
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()
  const [message, setMessage] = useState(null)

  const handleChange=(e)=>{
    const {name,value} = e.target;
    console.log(e.target.value);
    setform({
      ...formValue,[name]:value
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    axiosClient.post('/login',formValue)
    .then(({data}) => {
      console.log(data)
      setErrors(data)
      setMessage(data.message)
      setUser(data.user)
      setToken(data.token);
    })
    .catch(err => {
      const response = err.response;

        setErrors(response.data.errors)

    })
  }
  return (
    <>
     <div className='login-signup-form animated fadeInDown'>

         <div className='form'>
         <h1 className="title">Login Here</h1>
         {errors &&
         <div className='alert'>
          {
           Object.keys(errors).map(key =>(
              <p key={key}>{errors[key][0]}</p>
            ))
          }</div>}
         {message &&
         <div className='alert'>
          {

              <p>{message}</p>
          }</div>}
          <form onSubmit={onSubmit}>
          <input type="email" placeholder='Email' name="email" value={formValue.email} onChange={handleChange}/>
             <input type="password" placeholder='Password' name="password" value={formValue.password}onChange={handleChange}/>
             <button class="btn btn-block">Login</button>
             <p className="message">
              If it is not Register.<Link to="/signup">Sign Up</Link>
             </p>
          </form>
         </div>
     </div>
    </>
  )
}

export default Login

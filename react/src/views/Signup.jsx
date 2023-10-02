import React, { useState } from 'react'
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from '../context/ContextProvider.jsx';

function Signup() {
  const [formValue,setform] =useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  })
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const handleChange=(e)=>{
    const {name,value} = e.target;
    console.log(e.target.value);
    setform({
      ...formValue,[name]:value
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    axiosClient.post('/signup',formValue)
    .then(({data}) => {
      setErrors(data)
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
         <h1 className="title">Signup for Free</h1>
         {errors &&
         <div className='alert'>
          {
           Object.keys(errors).map(key =>(
              <p key={key}>{errors[key][0]}</p>
            ))
          }</div>}
          <form onSubmit={onSubmit}>
             <input type="text" placeholder='Name' name="name" value={formValue.name} onChange={handleChange}/>
             <input type="email" placeholder='Email' name="email" value={formValue.email} onChange={handleChange}/>
             <input type="password" placeholder='Password' name="password" value={formValue.password}onChange={handleChange}/>
             <input type="password" placeholder='Confirm Password' name="password_confirmation" value={formValue.password_confirmation} onChange={handleChange}/>
             <button class="btn btn-block">Sign up</button>
             <p className="message">
              Already Register.<Link to="/login">Sign In</Link>
             </p>
          </form>
         </div>
     </div>
    </>
  )
}

export default Signup

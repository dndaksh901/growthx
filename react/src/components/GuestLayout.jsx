import React from 'react'
import { Link, Navigate, Outlet} from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from "../axios-client.js";

function GuestLayout() {
  const {user,token} = useStateContext();

  if(token){
   return <Navigate to="/users" />
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }
  return (
    <>
      <div id="guestLayout" className='loginForm'>
      <Outlet />
    </div>
    </>

  )
}

export default GuestLayout

import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  // useEffect(() => {
  //   axiosClient.get('/user')
  //     .then(({data}) => {
  //        setUser(data)
  //     })
  // }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <nav class="navbar navbar-expand-sm">

            <div class="container-fluid">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             <li class="nav-item"> {user && user.name}</li>
             <li class="nav-item"><a onClick={onLogout} className="btn-logout" href="#">Logout</a></li>
            </ul>
            </div>
          </nav>
        </header>

            <Outlet/>
      </div>
    </div>
  )
}

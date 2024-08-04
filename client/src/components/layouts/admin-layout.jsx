import React from 'react'
import { FaUserShield } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../store/auth';

export default function Admin_layout() {
  const {user,isloading}=useAuth();

  if(isloading){
    return <h1>Loading.....</h1>
  }

  if(!user.isAdmin){
    return <Navigate to={"/"}/>
  }
  
  return (
    <>
      <header>
        <div style={{marginTop:"20px"}}>
          <NavLink to={'/admin/users'} style={{margin:"20px", fontSize:"33px"}}><FaUserShield />users  </NavLink>
          <NavLink to={'/admin/contact'} style={{margin:"20px", fontSize:"30px"}}><MdContactPhone />contact</NavLink>
        </div>
      </header>
      <Outlet/>
    </>
  )
}

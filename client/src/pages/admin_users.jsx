import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import "./Register.css"
import { Link } from 'react-router-dom';

export default function Admin_users() {
  const [users,setusers]=useState([ ])
  const {authorizetoken}=useAuth();
  const getalluserdata= async(id)=>{
    try{
      const  response = await fetch("http://localhost:5000/api/admin/users",{
        method:"GET",
        headers:{
          Authorization: authorizetoken,
        },
      })
      const data= await response.json();
      console.log(`users : ${data}`);
      setusers(data);
    }catch(error){
      console.log(error);
    }
  }
  
  const deleteuser=async(id)=>{
    try{
      const  response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization: authorizetoken,
        },
      })
      const data= await response.json();
      console.log(`users after delete : ${data}`);
      if(response.ok){
        getalluserdata();
      }
    }catch(error){
      console.log(error);
    }

  }

  useEffect(()=>{
    getalluserdata();
  },[])

  return <>
   <section>
    <div>
      <h1>Users data</h1>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {users.map((v,i)=>{
            return <tr key={i}>
              <td>{v.username}</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td><Link to={`/admin/users/${v._id}/edit`}>edit</Link></td>
              <td><button onClick={()=>deleteuser(v._id)}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </section>
  </>
}

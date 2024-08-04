import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import "./Register.css"
import { toast } from 'react-toastify';

export default function Admin_contact(){
  const [users,setusers]=useState([ ])
  const {authorizetoken}=useAuth();
  const getcontactdata= async()=>{
    try{
      const  response = await fetch("http://localhost:5000/api/admin/contact",{
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

  const deletecontact=async(id)=>{
    try{
      const  response = await fetch(`http://localhost:5000/api/admin/contact/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization: authorizetoken,
        },
      })
      if(response.ok){
        getcontactdata();
        toast.success("deleted successfully")
      }
      else{
        toast.error("not deleted")
      }
    }catch(error){
      console.log(error);
    }

  }

  useEffect(()=>{
    getcontactdata();
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
            <th>message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {users.map((v,i)=>{
            return <tr key={i}>
              <td>{v.username}</td>
              <td>{v.email}</td>
              <td>{v.message}</td>
              <td><button onClick={()=>deletecontact(v._id)}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </section>
  </>
}

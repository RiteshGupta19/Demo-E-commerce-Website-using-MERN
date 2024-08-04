import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export default function Admin_update() {
  const [data,setdata]=useState({
    username:"",
    email:"",
    phone:"",
  })

  const params=useParams();
  const {authorizetoken}=useAuth();
  
  const getsingleuserdata=async()=>{
    try{
      const  response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
        method:"GET",
        headers:{
          Authorization: authorizetoken,
        },
      })
      const data= await response.json();
      console.log(`users single data : ${data}`);
      setdata(data);
    }catch(error){
      console.log(error);
    }

  }

  
  useEffect(()=>{
    getsingleuserdata();
    
  },[])

  const handleinput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setdata({
      ...data,
      [name]:value,
    })
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization: authorizetoken,
      },
      body:JSON.stringify(data),
      }
      );
      if(response.ok){
        toast.success("update successfully")
      }
      else{
        toast.error("not updated")
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <form onSubmit={handlesubmit}>
      <h1>Update data....</h1>
        <div>
          <label>username</label> <br/>
          <input type='text' name='username' placeholder='enter name' autoComplete='off' id='username' onChange={handleinput} value={data.username} required/>
        </div>
        <div>
          <label>email</label> <br/>
          <input type='text' name='email' placeholder='enter email' autoComplete='off' id='email' onChange={handleinput} value={data.email} required />
        </div>
        <div>
          <label>phone</label> <br/>
          <input type='phone' name='phone' placeholder='enter email' autoComplete='off' id='phone' onChange={handleinput} value={data.phone} required/>
        </div>
        <input type='submit' className='submit' value={"update"}/>
      </form> 
  )
}

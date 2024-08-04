import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { useAuth } from '../store/auth';
import {toast } from 'react-toastify';

const Register =() =>{
  const [user,setuser]=useState({
    username:"",
    email:"",
    phone:"",
    password:""
  })
  
  const navigate = useNavigate();
  const {storeTokenInLS}= useAuth();

  const handleinput=(e)=>{
    let name=e.target.name;
    let value = e.target.value;
    setuser({
      ...user,
      [name]:value,
    })
  } 
  const handlesubmit= async(e)=>{
    e.preventDefault();
    console.log(user)
    try {
      const response = await fetch('http://localhost:5000/api/auth/reg',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server",res_data.message);


      if(response.ok){
        storeTokenInLS(res_data.token)
        setuser({ username:"",
        email:"",
        phone:"",
        password:""})
        navigate("/")
        toast.success("Resgitrstion successful")
       }
       else{
        toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message)
        console.log(res_data.extraDetails);
       }

     
  } catch (error){
    console.log("register :",error);
  }

  }

  return <>
  <section>
    <form onSubmit={handlesubmit}>
      <div>
        <label>username</label><br/>
        <input type="text" name="username" placeholder="enter name " id="username " required  autoComplete="off" value={user.username} onChange={handleinput}/>
      </div>
      <div>
        <label>email</label><br/>
        <input type="text" name="email" placeholder="enter email " id="email " required  autoComplete="off" value={user.email} onChange={handleinput}/>
      </div>
      <div>
        <label>Phone</label><br/>
        <input type="number" name="phone" placeholder="enter phone " id="phone" required  autoComplete="off" value={user.phone} onChange={handleinput}/>
      </div>
      <div>
        <label>password</label><br/>
        <input type="text" name="password" placeholder="enter password" id="password" required  autoComplete="off" value={user.password} onChange={handleinput}/>
      </div>
      <input className='submit' type='submit'></input>

    </form>
    
  </section>
  </>
}

export default Register;
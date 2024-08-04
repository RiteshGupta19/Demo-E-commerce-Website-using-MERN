import { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast } from 'react-toastify';


const URL='http://localhost:5000/api/auth/Login'
const Login =() =>{
  const [user,setuser]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate();
  const {storeTokenInLS} = useAuth();

  
  const handleinput=(e)=>{
    let name=e.target.name;
    let value = e.target.value;
    setuser({
      ...user,
      [name]:value,
    })
  } 
  const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log(user)
    try{
      const response= await fetch(URL,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      });

      console.log("login form",response);

      const res_data = await response.json();

      if(response.ok){
        storeTokenInLS(res_data.token)
        // localStorage.setItem("token",res_data.token);
        setuser({email:"",password:""});
        navigate('/')
        toast.success("Login successful")
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message)
        console.log("invalid Credential");
      }

    } catch(error){
      console.log("error",error);
    }
   

  }

  return <>
  <section>
    <form onSubmit={handlesubmit}>
      <div>
        <label>email</label><br/>
        <input type="text" name="email" placeholder="enter email " id="email " required  autoComplete="off" value={user.email} onChange={handleinput}/>
      </div>

      <div>
        <label>password</label><br/>
        <input type="text" name="password" placeholder="enter password" id="password" required  autoComplete="off" value={user.password} onChange={handleinput}/>
      </div>
      <input className='submit' type='submit' value={"Login"}></input>

    </form>
    
  </section>
  </>
}

export default Login;
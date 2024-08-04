import { useState } from 'react'
import './Register.css'
import { useAuth } from '../store/auth'

const defaultcontact={
  username:"",
  email:"",
  message:"",
}

const Contact=()=>{
  const [contact,setcontact]=useState(defaultcontact)

  const [userdata,setuserdata]=useState(true)
  const {user} =useAuth();

  if(userdata && user){
    setcontact({
      username:user.username,
      email:user.email,
      message:"",
    })
    setuserdata(false);
  }
  
  const handleinput=(e)=>{
    let name=e.target.name;
    let value = e.target.value;
    setcontact({
      ...contact,
      [name]:value,
    })
  } 
  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:5000/api/cont/contact',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(contact),
      });
      if(response.ok){
        setcontact(defaultcontact)
        const data= await response.json();
        console.log(data);
        alert("message send successfully")
      }
    } catch{
      alert("message not send ")
      console.log(error);
    }
  }
  return <>
      <form onSubmit={handlesubmit}>
        <div>
          <label>username</label> <br/>
          <input type='text' name='username' placeholder='enter name' id='username' onChange={handleinput} value={contact.username} />
        </div>
        <div>
          <label>email</label> <br/>
          <input type='text' name='email' placeholder='enter email' id='email' onChange={handleinput} value={contact.email} />
        </div>
        <div>
          <label>message</label> <br/>
          <textarea rows={5} cols={18} name='message' placeholder='enter message' id='message' onChange={handleinput} value={contact.message} />
        </div>
        <input type='submit' className='submit' />
      </form> 

  
  </>
}

export default Contact;
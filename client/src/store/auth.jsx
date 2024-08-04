import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
  const [token,settoken]=useState(localStorage.getItem("token"));
  const [user,setuser]=useState('');
  const [isloading,setisloading]=useState(true)
  const [services,setservices]=useState([])
  const authorizetoken=` Bearer ${token}`;  

  const storeTokenInLS = (serverToken)=>{
    settoken(serverToken);
    return localStorage.setItem("token",serverToken)
  }
  let islogedin = !!token;
  const LogoutUser =()=>{
    settoken('');
    return localStorage.removeItem("token")
  }
  
  const userauthentication = async()=>{
    try{
      setisloading(true)
      const response = await fetch('http://localhost:5000/api/auth/user',{
        method:"GET",
        headers:{  
          Authorization : authorizetoken,
        } 
      })  
      if (response.ok){
        const data = await response.json();
        console.log("user data",data.userdata);
        setuser(data.userdata)
        setisloading(false);

      }
      else{
        setisloading(false)
      }
    } catch (error){
      console.log("error fetching user data");
    }
  }

  const getservice = async ()=>{
    try{
      const response = await fetch("http://localhost:5000/api/data/service",{
        method:"GET",
      });
      if(!response.ok){
        const data= await response.json();
        console.log(data.msg);
        setservices(data.msg);
      }
    } catch(error){
      console.log(`service frontend error: ${error}`);
    }
  }

  useEffect(()=>{    
    getservice();
    userauthentication();
  },[]) 

  return (
  <AuthContext.Provider value={{islogedin,storeTokenInLS,LogoutUser,user,services,authorizetoken,isloading}}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth=()=>{
  const authConytextValue=useContext(AuthContext);
  if(!authConytextValue){
    throw new Error("useauth used outside of the provider")

  }
  return authConytextValue
}

import { useAuth } from "../store/auth";

const About =() =>{
  const {user}=useAuth();
  return <>
  <h1>Welcome ,  {user ? user.username : "to our website"}</h1>
  </>
}

export default About;
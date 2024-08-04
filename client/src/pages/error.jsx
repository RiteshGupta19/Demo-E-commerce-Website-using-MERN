import { NavLink } from 'react-router-dom';
import './Register.css'


const Error=() =>{
  return <>
  <div className="container">
    <h1 className='h1'>404</h1>
    <h4>PAGE NOT  FOUND!!</h4>
   <NavLink to={'/'}> <button className='btn'>Back to home</button> </NavLink>
   <NavLink to={'/Contact'}> <button className='btn'>click here</button> </NavLink>
  </div>
  
  </>
}
export default Error;
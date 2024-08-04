 import viteLogo from '/vite.svg';
 import './nav.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Nav=()=>{
  const {islogedin}=useAuth();
  return <>
              <div className='main'>
                <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="" alt="Vite logo" />
                </a>
                <div className='list'>
                  <li> <NavLink to="/"> Home</NavLink></li>
                  <li><NavLink to="/About"> About</NavLink></li>
                  <li><NavLink to="/Contact"> Contact</NavLink></li>
                  <li><NavLink to="/Service"> Service</NavLink></li>
                  {islogedin ? (
                          <li><NavLink to="/Logout"> Logout</NavLink></li>
                  ):
                  (
                    <>
                      <li><NavLink to="/Register"> Register</NavLink></li>
                      <li><NavLink to="/Login"> Login</NavLink></li>
                    </>
                  )}
                  
                </div>
              </div>
  </>
}

export default Nav;
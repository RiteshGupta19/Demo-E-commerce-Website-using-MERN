import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Error from "./pages/error"
import Logout from "./pages/logout";
import Services from "./pages/Service";
import Admin_layout from "./components/layouts/admin-layout";
import Admin_contact from "./pages/admin_contact";
import Admin_users from "./pages/admin_users";
import Admin_update from "./pages/admin-update";

function App() {

  return  <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Service" element={<Services/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/admin" element={<Admin_layout/>}>
        <Route path="users" element={<Admin_users/>} />
        <Route path="contact" element={<Admin_contact/>} />
        <Route path="users/:id/edit" element={<Admin_update/>} />
      </Route>
    </Routes>

    
    
    </BrowserRouter>
      
      
    </>
  
}

export default App

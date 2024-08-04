import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Logout() {
  const {LogoutUser}= useAuth();
  const navigate = useNavigate();
    useEffect(()=>{
      LogoutUser();
    },[LogoutUser]);
    return  navigate('/Login')
}


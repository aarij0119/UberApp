import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    console.log("otk v,f",token);
    const navigate = useNavigate();
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
        withCredentials:true
    })
    .then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/login');
        }
    })
    .catch((error)=>{
        console.log(error);
    })
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout
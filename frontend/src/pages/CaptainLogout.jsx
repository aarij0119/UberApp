import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate();
    const Captaintoken = localStorage.getItem('captaintoken');
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${Captaintoken}`
        },
        withCredentials: true
    })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('captaintoken');
                navigate('/captain-login')
            }
        })
        .catch((err) => {
            console.log(err)
        })

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout
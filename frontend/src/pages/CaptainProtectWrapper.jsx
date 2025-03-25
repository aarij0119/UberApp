import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captaintoken');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

    })

    return (
        <div>
            {children}
        </div>
    )
}

export default CaptainProtectWrapper
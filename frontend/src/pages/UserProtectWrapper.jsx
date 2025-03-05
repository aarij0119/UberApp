import React, { useContext, useEffect } from 'react'
import { UserContextData } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContextData);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);

    return (
        <>
            {children}
        </>
    );
}

export default UserProtectWrapper;

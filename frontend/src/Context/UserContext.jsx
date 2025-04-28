import React, { createContext, useEffect, useState } from 'react'

const UserContextData = createContext();
const UserContext = ({ children }) => {
    const [userdata, setuserdata] = useState({
        email:'',
        userfirstname:'',
        userlastname:''
    });
    const [userId,setUserId] = useState();
    useEffect(() => {
       const userId = localStorage.getItem('UserId')
      setUserId(userId)
      }, [])
    return (
        <UserContextData.Provider value={{userdata,setuserdata,setUserId,userId}}>
            {children}
        </UserContextData.Provider>
    )
}
export {UserContextData}
export default UserContext
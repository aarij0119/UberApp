import React, { createContext, useState } from 'react'

const UserContextData = createContext();
const UserContext = ({ children }) => {
    const [userdata, setuserdata] = useState({
        email:'',
        userfirstname:'',
        userlastname:''
    });
    // console.log("User data is this ",userdata)
    return (
        <UserContextData.Provider value={{userdata,setuserdata}}>
            {children}
        </UserContextData.Provider>
    )
}
export {UserContextData}
export default UserContext
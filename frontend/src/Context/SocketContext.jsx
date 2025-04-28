import React, { createContext, useEffect } from 'react'
import io from 'socket.io-client'
const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`)
const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('client connected from frontend')
        })
        socket.on('disconnect', () => {
            console.log('client disconnected from frontend')
        })
    },[])

    return (
        <SocketContext.Provider value={{socket}} >
            {children}
        </SocketContext.Provider>

    )
}

export { SocketContext }
export default SocketProvider
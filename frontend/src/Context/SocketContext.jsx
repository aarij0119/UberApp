import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

// Use the correct backend URL from the environment variable or fallback
const socket = io(import.meta.env.VITE_BASE_URL || 'https://pt26psr5-5173.inc1.devtunnels.ms', {
  transports: ['websocket', 'polling'], // Ensure compatibility with WebSocket and polling
  secure: true, // Force secure connection
  withCredentials: true, // Allow cookies and credentials
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Log when the client connects
    socket.on('connect', () => {
      // console.log('Client connected from frontend:', socket.id);
    });

    // Log when the client disconnects
    socket.on('disconnect', () => {
      // console.log('Client disconnected from frontend');
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    return () => {
      // Clean up socket listeners on unmount
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
export default SocketProvider;
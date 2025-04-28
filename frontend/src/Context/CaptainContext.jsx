import React, { createContext, useEffect, useState } from 'react'

const CaptainDataContext = createContext();
const CaptainContext = ({ children }) => {
  const [CaptainData, setCaptainData] = useState('');
  const [captainId,setCaptainId] = useState('');
  useEffect(() => {
    const CaptainId = localStorage.getItem('CaptainId');
    setCaptainId(CaptainId)
  }, [])
  return (
    <CaptainDataContext.Provider value={{ CaptainData, setCaptainData,captainId}}>
      {children}
    </CaptainDataContext.Provider>
  )
}
export { CaptainDataContext }
export default CaptainContext
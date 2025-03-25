import React, { createContext, useState } from 'react'

const CaptainDataContext = createContext();
const CaptainContext = ({children}) => {
    const [CaptainData,setCaptainData] = useState('');
  return (
    <CaptainDataContext.Provider value={{CaptainData,setCaptainData}}>
        {children}
    </CaptainDataContext.Provider>
  )
}
export {CaptainDataContext}
export default CaptainContext
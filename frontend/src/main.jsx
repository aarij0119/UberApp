import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContext from './Context/UserContext.jsx'
import CaptainContext from './Context/CaptainContext.jsx'
import SocketProvider from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <SocketProvider>
          <Router>
            <App />
          </Router>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </StrictMode>
)

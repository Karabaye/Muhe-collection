import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Pages from './Pages.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Pages/>
  </StrictMode>,
)

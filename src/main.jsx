import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-[1200px] mx-auto'>
      <App />
    </div>
  </StrictMode>,
)

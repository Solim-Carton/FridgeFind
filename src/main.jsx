import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PantryProvider } from './Context/Pantrycontext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter turns on page switching without reloads */}
    <BrowserRouter>
      {/* PantryProvider shares the saved recipes with every page inside it */}
      <PantryProvider>
        <App />
      </PantryProvider>
    </BrowserRouter>
  </React.StrictMode>
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cards from './Card.jsx'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Cards numCards={20} />
  </StrictMode>,
)


// Idea: create components for each card, keep track of which 
// ones have been clicked, keep track of current score, and best score 
// so far
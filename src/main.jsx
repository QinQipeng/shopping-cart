import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/css/index.css'
import ShoppingCart from './ShoppingCart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingCart />
  </StrictMode>,
)

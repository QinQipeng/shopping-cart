import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/css/index.css'
import ShoppingCart from './ShoppingCart'
import { createBrowserRouter, RouterProvider } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoppingCart />,
  },
  {
    path: "/:page",
    element: <ShoppingCart />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

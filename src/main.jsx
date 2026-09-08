import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/css/index.css'
import ShoppingCart from './ShoppingCart'
import { createBrowserRouter, redirect, RouterProvider } from "react-router"
import HomePage from './components/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoppingCart />,
    loader: () => redirect("/home")
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

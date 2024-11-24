import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "login", element: <Login />},
  {path: "register", element: <Register />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='app-container'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)

import React from 'react'
import { RouterProvider, createBrowserRouter} from 'react-router'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
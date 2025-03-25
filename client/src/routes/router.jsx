import { createBrowserRouter, Navigate, Outlet  } from "react-router";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Investments from "../pages/Investments.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";


const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/login' replace /> },
    { path: '/login', element: <Login /> },
    { 
        path: '/', 
        element: <ProtectedRoute /> ,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'investments', element: <Investments /> },
        ]
    },
]);

export default router;
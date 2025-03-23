import { createBrowserRouter, Navigate, Outlet  } from "react-router";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import InvestmentLog from "../pages/InvestmentLog.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";


const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/login' replace /> },
    { path: '/login', element: <Login /> },
    { 
        path: '/', 
        element: <ProtectedRoute /> ,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'investment-log', element: <InvestmentLog /> },
        ]
    },
]);

export default router;
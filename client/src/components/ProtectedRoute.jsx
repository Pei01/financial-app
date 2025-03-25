import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'
import { verify } from '../services/authService';
import Layout from './Layout.jsx';

const ProtectedRoute = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const isValid = await verify();

            setIsTokenValid(isValid);
            setIsLoading(false);
        }

        verifyToken();
    }, [])

    if (isLoading) {
        return <div className='w-screen h-dvh bg-neutral-950'></div>;
    }

    return isTokenValid ? <Layout /> : <Navigate to='/login' replace />;
}

export default ProtectedRoute
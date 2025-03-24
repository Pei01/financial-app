import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'
import { verify } from '../services/authService';

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
        return <div>Loading...</div>;
    }

    return isTokenValid ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectedRoute
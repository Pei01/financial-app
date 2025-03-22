import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input, Button } from '@heroui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
    const navigate = useNavigate();

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${BASE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                throw new Error(data.message);
            }

            navigate('/dashboard');

        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }

    return (
        <div className='w-screen h-dvh flex justify-center items-center bg-neutral-950'>
            <div className='w-96 h-96 relative flex flex-col items-center justify-center gap-6'>
                <h1 className='text-5xl font-bold text-white'>Login</h1>
                <Input 
                    size='sm'
                    label='Email' 
                    type='email'
                    variant='bordered'
                    className='text-white'
                    value={email}
                    onValueChange={setEmail}
                />

                <Input 
                    size='sm'
                    label='Password' 
                    type={isPasswordVisible ? 'text' : 'password'}
                    variant='bordered'
                    className='text-white'
                    endContent={
                        <button onClick={togglePasswordVisibility} className='h-full'>
                            {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                        </button>
                    }
                    value={password}
                    onValueChange={setPassword}
                />

                <Button 
                    className='w-full'
                    isDisabled={!email || !password}
                    isLoading={isLoading}
                    onPress={handleLogin}
                >
                    LOGIN
                </Button>

                <p className='text-red-500 absolute bottom-0'>
                    {error}
                </p>
            </div>
        </div>
    )
}

export default Login
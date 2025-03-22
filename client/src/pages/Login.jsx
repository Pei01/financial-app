import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input, Button, Alert } from '@heroui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { login } from '../services/authService.js'

const Login = () => {
    const navigate = useNavigate();

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', color: 'default', isVisible: false });

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    const handleLogin = async () => {
        setLoading(true);

        const alertDisplayTime = 2000;

        const data = await login(email, password);

        if (data.success) {
            setAlert({ message: 'Login successful', color: 'success', isVisible: true });

            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, alertDisplayTime);
        } else {
            setAlert({ message: data.message, color: 'danger', isVisible: true });
            setLoading(false);
        }

        setTimeout(() => {
            setAlert({ ...alert, isVisible: false });
        }, alertDisplayTime);

    }

    return (
        <div className='w-screen h-dvh flex flex-col justify-center items-center bg-neutral-950'>
            <div className={`w-1/2 absolute top-6 ${alert.isVisible ? 'alert-fade' : 'hidden'}`}>
                <Alert 
                    description={alert.message} 
                    color={alert.color}
                />
            </div>

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
            </div>
        </div>
    )
}

export default Login
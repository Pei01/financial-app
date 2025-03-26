import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input, Button, Alert, Tabs, Tab } from '@heroui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { login, signup } from '../services/authService.js'

const Login = () => {
    const navigate = useNavigate();

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', color: 'default', isVisible: false });

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    const resetInputs = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const handleLogin = async () => {
        setLoading(true);

        const alertDisplayTime = 2000;

        const response = await login(email, password);

        if (response.success) {
            setAlert({ message: 'Login successful', color: 'success', isVisible: true });

            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');

            }, alertDisplayTime);
        } else {
            setAlert({ message: response.message, color: 'danger', isVisible: true });
            setLoading(false);
        }

        setTimeout(() => {
            setAlert({ ...alert, isVisible: false });
        }, alertDisplayTime);

    }

    const handleSignup = async () => {
        setLoading(true);

        const alertDisplayTime = 2000;

        const response = await signup(username, email, password);

        if (response.success) {
            setAlert({ message: 'Signup successful', color: 'success', isVisible: true });

            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');

            }, alertDisplayTime);
        } else {
            setAlert({ message: response.message, color: 'danger', isVisible: true });
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

            <div className='w-96 h-[450px] relative flex flex-col items-center justify-start gap-6'>
                <h1 className='text-5xl font-bold text-white'>Welcome</h1>

                <Tabs 
                    fullWidth
                    aria-label='Login or Signup'
                    onSelectionChange={() => resetInputs()}
                >
                    <Tab key='login' title='Login'>
                        <div className='w-96 relative flex flex-col items-center justify-center gap-6'>
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
                    </Tab>

                    <Tab key='signup' title='Signup'>
                        <div className='w-96 relative flex flex-col items-center justify-center gap-6'>
                            <Input 
                                size='sm'
                                label='Username' 
                                type='text'
                                variant='bordered'
                                className='text-white'
                                value={username}
                                onValueChange={setUsername}
                            />

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
                                isDisabled={!username || !email || !password}
                                isLoading={isLoading}
                                onPress={handleSignup}
                            >
                              SIGN UP 
                            </Button>
                        </div> 
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}

export default Login
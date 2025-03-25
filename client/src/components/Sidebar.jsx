import React from 'react';
import { Avatar, Button } from '@heroui/react';
import { FiSidebar } from 'react-icons/fi';
import { RiHome6Line } from 'react-icons/ri';
import { MdOutlineAnalytics } from 'react-icons/md';
import { TbCoin } from 'react-icons/tb';

const Sidebar = ({isSidebarOpen, toggleSidebar}) => {
    const sidebarItems = [
        {
            icon: <RiHome6Line className='outline-none size-4'/>,
            label: 'Dashboard',
            link: '/dashboard',
        },
        {
            icon: <TbCoin className='outline-none size-4'/>,
            label: 'Investments',
            link: '/investments',
        },
        {
            icon: <MdOutlineAnalytics className='outline-none size-4'/>,
            label: 'Analytics',
            link: '/analytics',
        },
    ];

    return (
        <div className={`fixed top-0 left-0 flex flex-col gap-6 h-screen text-white bg-neutral-900 z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
                <div className='relative w-full h-16 bg-neutral-800 rounded'>
                    <button onClick={toggleSidebar} className={`absolute top-6 right-6 transition-all duration-300 ${ isSidebarOpen ? 'translateX-0' : 'translate-x-20'}`}>
                        <FiSidebar className='size-6' />
                    </button>
                </div>

                <div className={`flex flex-col gap-6 px-6 transition-all ${ isSidebarOpen ? 'opacity-1 duration-500' : 'opacity-0 duration-200'}`}>
                    <Avatar name='Pei'/>

                    {sidebarItems.map((item, index) => (
                        <a className='rounded-xl' href={item.link}>
                            <Button 
                                key={index}
                                variant='light' 
                                className='flex justify-start w-full'
                                startContent={item.icon}
                                >
                                {item.label}
                            </Button>
                        </a>
                    ))}
                </div>
        </div>
    )
}

export default Sidebar
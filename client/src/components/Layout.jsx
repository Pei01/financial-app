import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar.jsx'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/> 

            <main className={`w-full transition-all duration-300 ${isSidebarOpen ? 'ml-64 md:w-[calc(100%-16rem)]' : ''}`}>
                <Outlet />
            </main>
        </>
    )
}

export default Layout
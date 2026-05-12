import React, { useState, useContext } from 'react'
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { IoMenuSharp } from 'react-icons/io5';
import UserDropDown from '../components/UserDropDown';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';

const AuthLayout = () => {

    const { user } = useContext(AuthContext);

    const role = user?.role;

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className='h-screen flex flex-col'>

            <nav className="bg-linear-to-r from-white to-green-100 shadow-md px-6 py-3 flex justify-between">

                <div className="flex items-center gap-4">
                    <IoMenuSharp onClick={() => setIsOpen(!isOpen)} className='cursor-pointer text-3xl' />
                    <img
                        src={logo}
                        alt="JKUAT logo"
                        className="w-12 h-12"
                    />
                    <div className="uppercase text-lg font-semibold text-gray-800 hidden md:block">
                        <p>Jomo Kenyatta University of Agriculture and Technology</p>
                    </div>
                </div>

                <UserDropDown />

            </nav>

            <main className='flex flex-1 overflow-hidden'>
                <Sidebar isOpen={isOpen} role = {role} />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default AuthLayout;
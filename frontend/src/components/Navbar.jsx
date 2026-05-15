import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [mobile, setMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMobileMenu = () => {
        setMobile(!mobile);
        setMenuOpen(!menuOpen);
    }

    const scrollToSection = (sectionId) => {
        if (mobile) {
            setMobile(false);
            setMenuOpen(true);
        }
        
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    return (
        <nav className="bg-gradient-to-r from-white to-green-100 shadow-md px-6 py-3 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className='md:hidden'>
                        {menuOpen ?
                            <IoMenuSharp className='cursor-pointer text-3xl' onClick={toggleMobileMenu} />
                            :
                            <IoCloseSharp className='cursor-pointer text-3xl' onClick={toggleMobileMenu} />
                        }
                    </div>
                    <Link to='/'>
                        <img
                            src={logo}
                            alt="JKUAT logo"
                            className="w-18 h-20"
                        />
                    </Link>
                    <div className="uppercase text-lg font-semibold text-gray-800 hidden lg:block">
                        <p>Jomo Kenyatta University</p>
                        <p>of Agriculture and Technology</p>
                    </div>
                </div>

                <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <li className="hover:text-green-600 cursor-pointer transition">
                        <Link to='/'>Home</Link>
                    </li>
                    <li onClick={() => scrollToSection('how-it-works')} className="hover:text-green-600 cursor-pointer transition">
                        How it works
                    </li>
                    <li onClick={() => scrollToSection('about-us')} className="hover:text-green-600 cursor-pointer transition">
                        About Us
                    </li>
                    <li onClick={() => scrollToSection('contact-us')} className="hover:text-green-600 cursor-pointer transition">
                        Contact Us
                    </li>
                </ul>

                <div className="flex items-center gap-4">
                    <Link to='/login' className="text-green-700 font-medium hover:underline">
                        Log in
                    </Link>
                    <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                        Sign Up
                    </Link>
                </div>
            </div>

            {mobile && (
                <div className='md:hidden px-6 pb-4 flex justify-center'>
                    <ul className='flex flex-col gap-3 font-medium'>
                        <li onClick={() => scrollToSection('home')} className="hover:text-green-600 cursor-pointer transition">
                            Home
                        </li>
                        <li onClick={() => scrollToSection('how-it-works')} className="hover:text-green-600 cursor-pointer transition">
                            How it works
                        </li>
                        <li onClick={() => scrollToSection('about-us')} className="hover:text-green-600 cursor-pointer transition">
                            About Us
                        </li>
                        <li onClick={() => scrollToSection('contact-us')} className="hover:text-green-600 cursor-pointer transition">
                            Contact Us
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
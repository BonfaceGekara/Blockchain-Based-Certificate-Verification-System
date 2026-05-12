import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiUser, FiLogOut, FiMoon } from 'react-icons/fi';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const UserDropDown = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='relative' ref={menuRef}>
            <button onClick={() => setOpen(!open)}>
                <FaUserCircle className="text-4xl cursor-pointer mr-6 mt-2 hover:text-green-800" />
            </button>
            {
                open && (
                    <div className="absolute right-0 mt-4 w-48 bg-green-100 rounded-xl shadow-lg py-2 z-50">

                        <button className="flex items-center gap-3 px-4 py-2 w-full hover:bg-green-200"
                            onClick={() => navigate('/profile')}
                        >
                            <FiUser />
                            Profile
                        </button>

                    </div>
                )
            }
        </div>
    )
}

export default UserDropDown;
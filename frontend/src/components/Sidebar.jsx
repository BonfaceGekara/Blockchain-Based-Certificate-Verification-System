import React , { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdAdd, MdPeople, MdVerified, MdAttachMoney, MdList, MdLogout } from 'react-icons/md';
import { FaMoneyBill } from 'react-icons/fa6';
import { AuthContext } from '../context/authContext';

const Sidebar = ({ isOpen, role }) => {

    const adminMenu = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard /> },
        { name: 'Add Certificates', path: '/admin/addcertificates', icon: <MdAdd /> },
        { name: 'Manage Certificates', path: '/admin/manageCertificates', icon: <MdList /> },
        { name: 'Manage Users', path: '/admin/manageusers', icon: <MdPeople /> },
        { name: 'Verification Logs', path: '/admin/verifications', icon: <MdVerified /> }
    ];

    const verifierMenu = [
        { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
        { name: 'Verify Certificate', path: '/verify', icon: <MdVerified /> },
        { name: 'All Verifications', path: '/verifications', icon: <MdList /> },
        { name: 'Payments', path: '/payment', icon: <FaMoneyBill /> }
    ];

    const menu = (role === 'admin') ? adminMenu : verifierMenu;

    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try{
            await logout();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={`bg-green-700 text-white h-full flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-17'}`}>
            <div>
                <div className='p-4 text-lg font-bold border-b border-green-500'>
                    {isOpen ?
                        role === 'admin' ? 'Admin Panel' : 'Verifier Panel'
                        :
                        role === 'admin' ? 'AP' : 'VP'}
                </div>

                <ul className='mt-4 space-y-2'>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition ${isActive
                                        ? 'bg-white text-green-700 font-semibold'
                                        : 'hover:bg-green-600'
                                    }`
                                }
                            >
                                <span className='text-xl'>{item.icon}</span>

                                {isOpen && (<span className='text-sm'>{item.name}</span>)}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='p-3 border-t border-green-500'>

                <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition'
                >
                    <MdLogout className='text-xl' />
                    { isOpen && <span className="text-md">Logout</span> }
                </button>

            </div>
        </div>
    );
};

export default Sidebar;
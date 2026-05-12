import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ViewUser = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        phone: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/admin/users/${id}`,
                    { withCredentials: true }
                );
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
                toast.error('Failed to load the user!');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `/api/admin/users/${id}`,
                user,
                { withCredentials: true }
            );

            toast.success(res.data.message);

        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {loading && (<div>Loading</div>)}

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-2xl font-bold mb-8">
                    View User
                </h1>

                <form onSubmit={handleUpdate} className="space-y-8">

                    <div className="flex gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700">
                            Role: {user?.role}
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm ${user?.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {user?.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Email address'
                            value={user?.email}
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value })
                            }}
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type='number'
                            name='phoneNumber'
                            placeholder='e.g. 0712345678'
                            value={user?.phone}
                            onChange={(e) => {
                                setUser({ ...user, phone: e.target.value })
                            }}
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <button type='submit' className='bg-green-500 px-12 py-2 rounded-full'>
                        Edit User
                    </button>


                </form>

            </div>
        </div>
    )
}

export default ViewUser;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaBan, FaUserCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/admin/users", {
                withCredentials: true,
            });

            setFilteredUsers(res.data);
            setUsers(res.data);

        } catch (err) {
            console.log(err);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        let filtered = users;

        if (search.trim() !== "") {
            const term = search.toLowerCase();

            filtered = filtered.filter((user) =>
                user.name?.toLowerCase().includes(term) ||
                user.email?.toLowerCase().includes(term) ||
                user.role?.toLowerCase().includes(term)
            );
        }

        setFilteredUsers(filtered);
    }, [search, users]);

    const handleToggleStatus = async (id, isActive) => {
        const confirmAction = window.confirm(
            isActive ? "Disable this user?" : "Enable this user?"
        );

        if (!confirmAction) return;

        try {
            const res = await axios.put(`/api/admin/users/toggle/${id}`, {}, {
                withCredentials: true
            });

            toast.success(res.data.message);
            getAllUsers();

        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong!');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this user permanently?");

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`/api/admin/users/${id}`, {
                withCredentials: true
            });

            toast.success(res.data.message);
            getAllUsers();

        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Manage Users
                </h1>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-80 border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
            </div>

            <div className="bg-white shadow overflow-hidden">

                {loading ? (
                    <p className="p-6 text-center">Loading...</p>
                ) : filteredUsers.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        No users found
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-175">
                            <thead className="bg-green-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Mobile</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-gray-200 transition"
                                    >
                                        <td className="px-1 font-medium">
                                            {user.email}
                                        </td>

                                        <td className="px-1">
                                            {user.phone}
                                        </td>

                                        <td className="px-1 capitalize">
                                            {user.role}
                                        </td>

                                        <td className="px-1">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${user.isActive === false
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                                    }`}
                                            >
                                                {user.isActive ? <p>Active</p> : <p>Inactive</p>}
                                            </span>
                                        </td>

                                        <td className="px-1 flex items-center justify-center gap-0">
                                            <div className="flex justify-center mt-6 gap-4">

                                                <button
                                                    title="View user"
                                                    onClick={() => navigate(`/admin/users/${user._id}`)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <FaEye />
                                                </button>

                                                <button
                                                    title={user.isActive ? "Disable user" : "Enable user"}
                                                    onClick={() => handleToggleStatus(user._id, user.isActive)}
                                                    className={`${user.isActive
                                                        ? "text-yellow-500 hover:text-yellow-700"
                                                        : "text-gray-400 hover:text-gray-600"
                                                        }`}
                                                >
                                                    <FaBan />
                                                </button>

                                                <button
                                                    title="Delete user"
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
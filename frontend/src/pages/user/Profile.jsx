import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || ""
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const updateProfile = (e) => {
        e.preventDefault();

        //later implementation
        console.log("Update Profile:", profile);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        //later implementation
        console.log("Change Password:", passwords);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                My Profile
            </h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                <form
                    onSubmit={updateProfile}
                    className="bg-white rounded-2xl shadow p-6 space-y-4"
                >

                    <h2 className="text-lg font-semibold text-green-700 border-b pb-2">
                        Edit Profile
                    </h2>

                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Update Profile
                    </button>

                </form>

                <form
                    onSubmit={updatePassword}
                    className="bg-white rounded-2xl shadow p-6 space-y-4"
                >

                    <h2 className="text-lg font-semibold text-green-700 border-b pb-2">
                        Change Password
                    </h2>

                    <div>
                        <label className="text-sm text-gray-600">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        Change Password
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Profile;
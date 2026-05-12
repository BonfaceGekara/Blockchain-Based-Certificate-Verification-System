import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import securityImg from "../../assets/security.png";

const Signup = () => {
    const navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        email: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (registerForm.password !== registerForm.confirmPassword) {
                toast.error('Passwords provided must match!');
                return;
            }

            const res = await axios.post("/api/auth/register", registerForm );

            toast.success(res.data.message);

            console.log(res);

            navigate("/activate", { state: {email: res.data.email}});

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen flex py-8 justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${securityImg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-green-900/70"></div>

            <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
                    Register a new Account
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-2">
                        <label className="block mb-1 text-sm font-medium">
                            Email Address<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={registerForm.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1 text-sm font-medium">
                            Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your or organization's name (short)"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={registerForm.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1 text-sm font-medium">
                            Phone<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="e.g 0712345678"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={registerForm.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={registerForm.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            Confirm Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={registerForm.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center pt-4">Or</p>

                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;
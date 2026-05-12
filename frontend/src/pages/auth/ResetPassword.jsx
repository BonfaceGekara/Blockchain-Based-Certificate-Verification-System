import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import securityImg from "../../assets/security.png";

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email] = useState(location.state?.email || "");

    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {

            setLoading(true);

            const res = await axios.post("/api/auth/reset-password", {
                email, code, newPassword
            }
            );

            toast.success(res.data.message);

            navigate("/login");

        } catch (err) {

            toast.error(err.response?.data?.message || "Password reset failed!");

            console.log(err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${securityImg})`
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-green-900/70"></div>

            <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="block text-sm font-medium mb-1">
                            Verification Code
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Enter reset code"
                            value={code}
                            onChange={(e) => setCode(e.target.value) }
                            required
                        />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-medium mb-1">
                            New Password
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-medium mb-1">
                            Confirm Password
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    <p className="mt-4 text-center text-sm">

                        Back to{" "}

                        <Link to="/login" className="text-green-600 font-medium hover:underline">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
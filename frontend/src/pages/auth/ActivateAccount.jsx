import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import securityImg from "../../assets/security.png";

const ActivateAccount = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email] = useState(location.state?.email || '');
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post("/api/auth/verify-code", {
                email,
                code,
            });

            toast.success(res.data.message);

            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Account verification failed!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {
        try {

            const res = await axios.post(
                "/api/auth/resend-code",
                { email }
            );

            toast.success(
                res.data.message
            );

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Failed to resend code"
            );
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${securityImg})` }}
        >
            <div className="absolute inset-0 bg-green-900/70"></div>

            <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Activate Account
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Verification code<span className="text-red-500">*</span>
                        </label>
                        <input
                            type='number'
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Enter your verification code"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                    >
                        {loading ? "Activating..." : "Activate"}
                    </button>

                    <div className="py-3 flex">
                        <p>Resend verification code</p>
                        <button type="button" onClick={resendCode} className="ml-2 cursor-pointer underline text-green-500">
                            Click here
                        </button>
                    </div>

                    <p className="mt-3 text-center text-sm">
                        Continue to Login{" "}
                        <Link to="/login" className="text-green-600 font-medium hover:underline">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default ActivateAccount;
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import securityImg from "../../assets/security.png";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });

            login(res.data.user);
            toast.success(res.data.message);

            navigate("/");
        } catch (err) {
            if( err.response?.data?.requiresActivation) {
                toast.error( err?.response?.data?.message);
                navigate('/activate', {state: {email: err?.response?.data?.email}});
                return;
            }
            toast.error(err.response?.data?.message || "Login failed!");
            console.log(err);
        } finally {
            setLoading(false);
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
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Email Address<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-green-400 rounded-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="mt-4 text-center text-sm">
                        <Link to="/forgot" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>

                    <p className="mt-3 text-center text-sm">
                        Register as verifier{" "}
                        <Link to="/signup" className="text-green-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;
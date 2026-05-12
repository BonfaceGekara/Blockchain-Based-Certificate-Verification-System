import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import securityImg from "../../assets/security.png";

const ForgotPass = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post('/api/auth/forgot', { email });
      console.log(res);
      toast.success(res.data.message);
      navigate('/reset-password', { state: {email }});
    } catch(err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${securityImg})` }}
    >
      <div className="absolute inset-0 bg-green-900/70"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-green-400 rounded-lg"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            {loading ? "Submiting..." : "Submit"}
          </button>

          <p className="mt-4 text-center text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
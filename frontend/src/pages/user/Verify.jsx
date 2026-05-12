import React, { useState, useContext } from "react";
import { MdVerified } from "react-icons/md";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import Results from "../../components/Results";

const Verify = () => {

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        certificateNumber: "",
        phone: user.phone
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!formData.certificateNumber || !formData.phone) {
            toast.error('All fields are required!');
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post('/api/payment/initiate', formData, { withCredentials: true });

            setResult(res.data);

        } catch (err) {
            setLoading(false);
            console.log(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Verify Certificate
            </h1>

            {result ?
                <Results result={result} />
            :
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">

                    <h2 className="text-lg font-semibold mb-4">
                        Enter Verification Details
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <label className="block text-gray-700 mb-1">
                                Certificate Number
                            </label>
                            <input
                                type="text"
                                name="certificateNumber"
                                value={formData.certificateNumber}
                                onChange={handleChange}
                                placeholder="e.g. CERT-2026-001"
                                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">
                                Phone Number (for payment)
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                You can change this number if needed
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-green-300 p-4 rounded-lg flex justify-between items-center">
                            <span className="text-gray-400">Verification Fee</span>
                            <span className="font-semibold text-green-600">
                                KES 200
                            </span>
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? "Processing ..." : "Verify Certificate"}
                        </button>

                    </div>

                </div>
            }

        </div>
    );
};

export default Verify;
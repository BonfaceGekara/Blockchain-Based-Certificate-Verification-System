import React, { useState, useContext } from "react";
import { MdVerified } from "react-icons/md";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthFooter from "../../components/AuthFooter";

const Verify = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        certificateNumber: "",
        phone: user.phone,
        amount: 1
    });

    const [loading, setLoading] = useState(false);
    const [showChoice, setShowChoice] = useState(false);
    const [certificateNumber, setCertificateNumber] = useState("");

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

            const paymentRes = await axios.post('/api/payments/initiate', formData, { withCredentials: true });

            toast.success(paymentRes.data.message);

            setCertificateNumber(formData.certificateNumber);

            setTimeout(() => {
                setShowChoice(true);
                setLoading(false);
            }, 10000);

        } catch (err) {
            setLoading(false);
            console.log(err.response?.data?.message);
            toast.error(err.response?.data?.message || 'Payment initiation failed');
        }
    };

    const goToVerifications = () => {
        navigate('/verifications', {
            state: {
                certificateNumber: certificateNumber,
                message: 'Payment initiated! Check verification status below.'
            }
        });
    };

    const stayOnPage = () => {
        setShowChoice(false);
        toast.success('You can verify another certificate or check status later in Verifications page');
        setFormData({
            certificateNumber: "",
            phone: user.phone,
            amount: 200
        });
    };

    return (

        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Verify Certificate
            </h1>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">

                {!showChoice ? (
                    <div>
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
                                    placeholder="e.g. 26-1234 for 'Certificate Number/26  1234'"
                                    className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    disabled={loading}
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
                                    disabled={loading}
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
                ) : (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-green-800 font-medium mb-3">
                            Payment initiated successfully!
                        </p>
                        <p className="text-green-700 text-sm mb-4">
                            Would you like to check the verification status<span className="text-red-600">(once paid</span>) or continue verifying another certificate?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={goToVerifications}
                                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                View Verification Status
                            </button>
                            <button
                                onClick={stayOnPage}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Verify Another Certificate
                            </button>
                        </div>
                    </div>
                )}

            </div>

            <AuthFooter />

        </div>
    );
};

export default Verify;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Results from "../../components/Results.jsx";

const VerificationDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [certificateData, setCertificateData] = useState(null);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const res = await axios.get(`/api/verifier/verification/${id}`, {
                    withCredentials: true
                });

                setVerification(res.data.verification);

            } catch (err) {
                console.log(err);
                toast.error('Failed to load verification details');
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this verification record?');

        if (!confirmDelete) return;

        try {
            setDeleting(true);
            await axios.delete(`/api/verifier/verifications/${id}`, {
                withCredentials: true
            });

            toast.success('Verification record deleted successfully');
            navigate("/verifications");

        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to delete verification');
        } finally {
            setDeleting(false);
        }
    };

    const handleViewResult = async () => {
        try {
            const certificateId = verification.certificateId;

            console.log(certificateId);

            if (!certificateId) {
                setCertificateData({
                    cert: null,
                    message: "No certificate associated with this verification"
                });
                setShowResults(true);
                return;
            }


            setCertificateData({
                cert: certificateId
            });
            setShowResults(true);
        } catch (err) {
            console.log(err);
            setCertificateData({
                cert: null,
                message: err.response?.data?.message || "Failed to load certificate details"
            });
            setShowResults(true);
        }
    };

    const handleBack = () => {
        setShowResults(false);
        setCertificateData(null);
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (!verification) {
        return (
            <div className="p-6 text-center text-red-500">
                Verification not found
            </div>
        );
    }

    const isSuccess = verification.result === "valid";

    if (showResults) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <button
                    onClick={handleBack}
                    className="mb-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                >
                    ← Back to Details
                </button>
                <Results result={certificateData} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Verification Details
            </h1>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

                <div>
                    <h2 className="text-lg font-semibold mb-3">Payment Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">

                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-500">Payment Number</p>
                            <p className="font-semibold">
                                {verification.paymentNumber || '0113390198'}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-500">Amount</p>
                            <p className="font-semibold">
                                KES {verification.amount || 200}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-500">Time</p>
                            <p className="font-semibold">
                                {new Date(verification.createdAt).toLocaleString()}
                            </p>
                        </div>

                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3">Status</h2>

                    <span className={`px-3 py-1 rounded text-sm font-medium ${verification.status === "complete"
                        ? "bg-green-100 text-green-600"
                        : verification.status === "failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                        {verification.status}
                    </span>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3">Result</h2>

                    <span className={`px-3 py-1 rounded text-sm font-medium ${verification.result === "valid"
                        ? "bg-green-100 text-green-600"
                        : verification.result === "revoked"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-red-100 text-red-600"
                        }`}>
                        {verification.result || "pending"}
                    </span>
                </div>

                {verification.status === "failed" && verification.failureReason && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded">
                        <h2 className="text-red-600 font-semibold mb-2">
                            Failure Reason
                        </h2>
                        <p className="text-sm text-gray-700">
                            {verification.failureReason}
                        </p>
                    </div>
                )}

                {verification.result === "invalid" && verification.failureReason && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded">
                        <h2 className="text-red-600 font-semibold mb-2">
                            Failure Reason
                        </h2>
                        <p className="text-sm text-gray-700">
                            {verification.failureReason}
                        </p>
                    </div>
                )}

                <div className="flex justify-between pt-4 border-t">

                    <button
                        onClick={handleViewResult}
                        disabled={!isSuccess}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition ${isSuccess
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <FaEye />
                        View Result
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                        <FaTrash />
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default VerificationDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";

const VerificationDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const res = await axios.get(`/api/verifier/verification/${id}`, {
                    withCredentials: true
                });

                setVerification(res.data.verification);
                console.log(res.data)

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchVerification();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/verifier/verifications/${id}`, {
                withCredentials: true
            });

            navigate("/user/verifications");

        } catch (err) {
            console.log(err);
        }
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
                                {verification.paymentNumber}
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

                {/* FAILURE REASON */}
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

                <div className="flex justify-between pt-4 border-t">

                    <button
                        onClick={() => navigate(`/user/certificate/${verification._id}`)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <FaEye />
                        View Result
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        <FaTrash />
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default VerificationDetails;
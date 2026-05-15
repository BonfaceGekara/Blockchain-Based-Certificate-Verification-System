import React, { useState } from "react";
import { MdVerified, MdPayment } from "react-icons/md";
import AuthFooter from "../../components/AuthFooter";

const Payment = () => {

    const [currentPlan] = useState("pay-per-use"); // later from backend

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Subscription
            </h1>

            <div className="bg-white p-6 rounded-2xl shadow mb-8 flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">Current Plan</p>
                    <h2 className="text-lg font-semibold capitalize">
                        {currentPlan === "pay-per-use" ? "Pay Per Verification" : "Monthly Plan"}
                    </h2>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow border border-green-300">

                    <div className="flex items-center gap-3 mb-4">
                        <MdPayment className="text-blue-600 text-2xl" />
                        <h2 className="text-lg font-semibold">
                            Pay Per Verification
                        </h2>
                    </div>

                    <p className="text-gray-500 text-sm mb-4">
                        Pay only when you verify a certificate.
                    </p>

                    <h3 className="text-2xl font-bold mb-4">
                        KES 200 <span className="text-sm text-gray-500">/ verification</span>
                    </h3>

                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>Instant verification</li>
                        <li>No commitment</li>
                        <li>Pay only when needed</li>
                    </ul>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow border-2 border-gray-500 relative">

                    <span className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Coming soon
                    </span>

                    <div className="flex items-center gap-3 mb-4">
                        <MdVerified className="text-gray-600 text-2xl" />
                        <h2 className="text-lg font-semibold">
                            Monthly Subscription
                        </h2>
                    </div>

                    <p className="text-gray-500 text-sm mb-4">
                        Best for frequent verifications.
                    </p>

                    <h3 className="text-2xl font-bold mb-4">
                        KES 2,000 <span className="text-sm text-gray-500">/ month</span>
                    </h3>

                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>Unlimited verifications</li>
                        <li>Faster processing</li>
                    </ul>

                    <button className="disabled w-full bg-gray-300 text-white py-2 rounded-lg hover:bg-gray-300">
                        Upgrade Plan
                    </button>

                </div>

            </div>

            <AuthFooter />

        </div>
    );
};

export default Payment;
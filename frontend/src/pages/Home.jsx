import React from "react";
import { FaMoneyBillWave, FaBolt, FaUserCog, FaEnvelope, FaShieldAlt, FaTicketAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {

    const features = [
        {
            icon: <FaMoneyBillWave />,
            title: "Pay Per Query",
            desc: "No subscriptions required. You only pay when you verify a certificate.",
        },
        {
            icon: <FaBolt />,
            title: "Quick Query (No Login)",
            desc: "Verify certificates instantly without creating an account.",
        },
        {
            icon: <FaUserCog />,
            title: "Account Management",
            desc: "Create an account to manage and track all your verification requests.",
        },
        {
            icon: <FaEnvelope />,
            title: "Email Notifications",
            desc: "Verification results are automatically sent to your email.",
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Verification",
            desc: "Blockchain ensures certificates are authentic and tamper-proof.",
        },
        {
            icon: <FaTicketAlt />,
            title: "Bulk Discounts",
            desc: "We offer discounts for bulk certificate verification.",
        },
    ];

    return (
        <div className="bg-gray-50">

            <div className="py-20 px-6 text-center bg-linear-to-b from-white to-green-50">

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                    Online Certificate Verification
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-4">
                    Securely verify all certificates issued by Jomo Kenyatta University of
                    Agriculture and Technology including certificate, diploma, undergraduate
                    and postgraduate qualifications.
                </p>
                <p className="text-gray-700 text-lg">
                    A nominal fee of{" "}
                    <span className="font-bold text-green-700 text-xl">
                        Ksh. 200
                    </span>{" "}
                    is charged per verification query.
                </p>
                <div className="max-w-2xl mx-auto bg-white p-6 mb-8 space-y-2">
                    <p className="text-gray-600">
                        For bulk queries click on the <span className='text-green-700 underline'>Get Started Here</span> button below to create an account
                    </p>
                    <p className="text-gray-600">
                        For quick queries click on the <span className='text-blue-600 underline'>Make a Quick Query</span> button below to quickly query a certificate
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:text-white hover:scale-105 transition duration-300">
                        Get Started Here
                    </button>
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 hover:scale-105 transition duration-300">
                        Make a Quick Query
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mb-5 py-6 px-12 md:py-12 md:px-24 bg-green-600 text-white">

                <div className="w-full md:w-3/5 space-y-5 md:pr-16">
                    <p className="font-bold text-2xl uppercase">
                        Quick Query
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        No Need to Login!
                    </h2>
                    <p className="text-lg text-gray-200">
                        "I just want to make a quick query without signing up." If this is you, then this is for you.
                        This feature allows employers and institutions to verify certificates instantly.
                        Results will be displayed and sent via email after system validation.
                    </p>
                </div>

                <div className="w-full md:w-2/5 mt-12 md:mt-0">
                    <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl">

                        <h3 className="text-2xl font-bold text-center mb-6">
                            Make a Quick Query
                        </h3>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Certificate Number"
                                required
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number (M-Pesa)"
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                            <input
                                type="email"
                                placeholder="Notification Email"
                                required
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                            <p className="text-sm text-gray-500">
                                Verification results will be sent to this email.
                            </p>
                            <label className="flex items-start gap-2 text-sm">
                                <input type="checkbox" required className="mt-1" />
                                <span>
                                    I confirm I have consent to verify this certificate.
                                </span>
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                                >
                                    Pay with M-Pesa and Verify
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-sm text-center text-gray-500">
                            Want to track queries?{" "}
                            <Link to='/login' className="text-green-600 underline cursor-pointer">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800">
                    Our Features
                </h2>
                <p className="mt-3 text-lg text-gray-600">
                    Explore the powerful features of our certificate verification system.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 hover:bg-white border rounded-xl p-8 mb-5 shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center text-center space-y-4"
                        >
                            <div className="p-4 bg-green-600 text-white rounded-full text-2xl shadow-md">
                                {feature.icon}
                            </div>

                            <h4 className="text-xl font-semibold text-gray-800">
                                {feature.title}
                            </h4>

                            <p className="text-gray-600 text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default Home;
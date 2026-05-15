import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-lg mx-auto text-center">


                <h1 className="text-6xl md:text-8xl font-extrabold text-gray-800 mb-4">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-8">
                    Oops! The page you are looking for does not exist!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md"
                    >
                        <FaHome />
                        Go to Homepage
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition duration-300"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
import React from "react";
import { MdVerified } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";

const Results = ({ result }) => {

    const cert = result.cert;

    return (
        <div className="max-w-2xl mx-auto mt-6">

            {result.cert ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200">

                    <div className="bg-green-600 text-white p-5 flex items-center gap-3">
                        <MdVerified className="text-2xl" />
                        <h2 className="text-lg font-semibold">
                            Certificate Verified
                        </h2>
                    </div>

                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-xs">Certificate Number</p>
                            <p className="font-semibold text-gray-800">
                                {cert.certificateNumber}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-xs">Holder Name</p>
                            <p className="font-semibold text-gray-800">
                                {cert.fullname}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-xs">Programme</p>
                            <p className="font-semibold text-gray-800">
                                {cert.programme}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-xs">Award</p>
                            <p className="font-semibold text-gray-800">
                                {cert.award}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                            <p className="text-gray-500 text-xs">Graduation Date</p>
                            <p className="font-semibold text-gray-800">
                                {new Date(cert.graduationDate).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            Verified successfully
                        </span>

                    </div>

                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6 text-center">

                    <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-3" />

                    <h2 className="text-lg font-semibold text-red-600 mb-2">
                        Verification Failed
                    </h2>

                    <p className="text-gray-600 text-sm">
                        {result.message}
                    </p>

                </div>
            )}

        </div>
    );
};

export default Results;
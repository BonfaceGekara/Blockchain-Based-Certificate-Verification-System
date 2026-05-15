import React from "react";
import {
    FaMoneyBillWave, FaBolt, FaUserCog, FaEnvelope, FaShieldAlt, FaTicketAlt
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

    const howItWorksSteps = [
        {
            step: 1,
            icon: <FaTicketAlt />,
            title: "Enter Certificate Details",
            desc: "Provide the unique certificate ID or serial number printed on the document.",
        },
        {
            step: 2,
            icon: <FaMoneyBillWave />,
            title: "Make Payment",
            desc: "Pay the nominal fee of Ksh. 200 via M-Pesa, card, or mobile money.",
        },
        {
            step: 3,
            icon: <FaShieldAlt />,
            title: "Instant Verification",
            desc: "Our system verifies the certificate against blockchain records in seconds.",
        },
        {
            step: 4,
            icon: <FaEnvelope />,
            title: "Receive Results",
            desc: "Get instant results on screen plus save the searched records.",
        },
    ];

    return (
        <div className="bg-gray-50">

            <div id="home" className="py-20 px-6 text-center bg-linear-to-b from-white to-green-50">

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
                        To start queries click on the <span className='text-green-700 underline'>Get Started Here</span> button below to create an account
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to='/login' className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:text-white hover:scale-105 transition duration-300">
                        Get Started Here
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800">
                    Our Features
                </h2>
                <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
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
                    ))};

                </div>
            </div>

            <div id="how-it-works" className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
                        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                            Simple, transparent and fast — verify any certificate in four easy steps.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorksSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
                            >
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                    {step.step}
                                </div>
                                <div className="mt-4 mb-4 text-green-600 text-3xl flex justify-center">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="about-us" className="py-20 px-6 bg-linear-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Jomo Kenyatta University of Agriculture and Technology
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                JKUAT is a globally recognized institution of higher learning dedicated to innovation,
                                technology, and academic excellence. Established in 1994, we have grown to become one
                                of East Africa's premier universities, offering world-class education in agriculture,
                                engineering, science, and technology.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our online certificate verification system is designed to combat certificate fraud and
                                provide employers, institutions, and government bodies with a reliable way to authenticate
                                academic credentials issued by JKUAT.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">Blockchain-Powered Security</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">24/7 Instant Access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">Trusted by 1000+ Organizations</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
                            <div className="text-green-600 text-6xl mb-4 flex justify-center">
                                <FaShieldAlt />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h4>
                            <p className="text-gray-600">
                                To provide a seamless, affordable and tamper-proof certificate verification
                                system that upholds the integrity of academic achievements and fosters trust
                                among all stakeholders.
                            </p>
                            <div className="mt-6 pt-6 border-t border-green-200">
                                <p className="text-sm text-gray-500">Accredited by the Commission for University Education (CUE)</p>
                                <p className="text-sm text-gray-500 mt-1">Member of the Association of African Universities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact-us" className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
                        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                            Have questions or need assistance? Reach out to our support team.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Visit Us</h4>
                                    <p className="text-gray-600 text-sm">
                                        Jomo Kenyatta University of Agriculture and Technology<br />
                                        P.O. Box 62000-00200, Nairobi, Kenya<br />
                                        Main Campus: Juja, along Thika Superhighway
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
                                    <p className="text-gray-600 text-sm">
                                        registrar@jkuat.ac.ke
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
                                    <p className="text-gray-600 text-sm">
                                        +254 (20) 123 4567<br />
                                        +254 722 123 456 (Mobile)<br />
                                        Mon-Fri, 8:00 AM - 5:00 PM (EAT)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Information</h3>
                            <div className="space-y-5">
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                         Verification Processing Time
                                    </h4>
                                    <p className="text-gray-600 text-sm">Results are delivered instantly after payment confirmation. Email notifications are sent within 2-3 minutes.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        Payment Methods
                                    </h4>
                                    <p className="text-gray-600 text-sm">We accept M-Pesa, Visa, Mastercard, and bank transfers. All transactions are securely processed.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="text-green-600"></span> Data Privacy
                                    </h4>
                                    <p className="text-gray-600 text-sm">Your data is protected under Kenyan data protection laws. We never share personal information with third parties.</p>
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                        Support Hours
                                    </h4>
                                    <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 5:00 PM (EAT)<br />Saturday: 9:00 AM - 1:00 PM<br />Sunday & Public Holidays: Closed</p>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-green-200 text-center">
                                <p className="text-gray-500 text-sm">
                                    For urgent verification inquiries, please call our support hotline.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
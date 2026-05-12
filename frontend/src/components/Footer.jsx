import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-600 text-white">

            <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

                <div className="space-y-4">
                    <h1 className="text-2xl font-semibold">
                        Always Prompt & Professional
                    </h1>
                    <p className="text-gray-200 text-sm leading-relaxed">
                        This system offers fast and reliable verification to employers,
                        institutions, and other external organizations to confirm the
                        authenticity of academic credentials issued by our university.
                    </p>
                </div>

                <div className="space-y-4">
                    <h1 className="text-xl font-semibold">
                        Our System
                    </h1>

                    <ul className="flex flex-col gap-2 text-gray-200">
                        <li>
                            Home
                        </li>
                        <li>
                            How it works
                        </li>
                        <li>
                            About Us
                        </li>
                        <li>
                            Contact Us
                        </li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h1 className="text-xl font-semibold">
                        Let's Connect
                    </h1>

                    <div>
                        <h2 className="font-medium">Phone</h2>
                        <p className="text-gray-200 text-sm">0712345678</p>
                    </div>

                    <div>
                        <h2 className="font-medium">Email</h2>
                        <p className="text-gray-200 text-sm">admin@gmail.com</p>
                    </div>

                    <div>
                        <h2 className="font-medium">Address</h2>
                        <p className="text-gray-200 text-sm">Juja, Kenya</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-green-300"></div>

            <div className="text-center py-6 text-sm text-gray-200">
                <p>
                    Copyright &copy; 2026 JKUAT Certificate Verification System
                </p>
                <p className="mt-1">
                    Powered by Bonface Morara
                </p>
            </div>

        </footer>
    )
}

export default Footer;
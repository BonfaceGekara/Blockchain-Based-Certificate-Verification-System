import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaBan } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageCertificates = () => {

    const [certificates, setCertificates] = useState([]);
    const [filteredCertificates, setFilteredCertificates] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCertificates = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/admin/certificates", {
                withCredentials: true,
            });
            setCertificates(res.data);
            setFilteredCertificates(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load certificates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    // Search
    useEffect(() => {
        let filtered = certificates;

        if (search.trim() !== "") {
            const term = search.toLowerCase();

            filtered = filtered.filter((cert) =>
                cert.certificateNumber?.toLowerCase().includes(term) ||
                cert.fullname?.toLowerCase().includes(term) ||
                cert.programme?.toLowerCase().includes(term) ||
                cert.award?.toLowerCase().includes(term) ||
                cert.graduationDate?.toLowerCase().includes(term)
            );
        }

        setFilteredCertificates(filtered);

    }, [search, certificates]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;

        try {
            await axios.delete(`/api/admin/certificate/${id}`,
                {withCredentials: true }
        );
            toast.success("Certificate deleted");
            fetchCertificates();
        } catch (err) {
            console.log(err);
            toast.error("Delete failed");
        }
    };

    //revoke
    const handleRevoke = async (id) => {
        try {
            await axios.put(`/api/admin/certificate/${id}`,
                { withCredentials: true }
            );
            toast.success("Certificate revoked");
            fetchCertificates();
        } catch (err) {
            console.log(err);
            toast.error("Revoke failed");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Manage Certificates
                </h1>

                <input
                    type="text"
                    placeholder="Search certificate..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-99 border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
            </div>

            <div className="bg-white shadow overflow-hidden">

                {loading ? (
                    <p className="p-6 text-center">Loading...</p>
                ) : filteredCertificates.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        No certificates found
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-300">
                            <thead className="bg-green-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Certificate No</th>
                                    <th className="p-4">Holder'name</th>
                                    <th className="p-4">Programme</th>
                                    <th className="p-4">Award</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCertificates.map((cert) => (
                                    <tr
                                        key={cert._id}
                                        className="border-t border-gray-400 hover:bg-gray-200 transition"
                                    >
                                        <td className="p-4 font-medium text-sm">
                                            {cert.certificateNumber}
                                        </td>

                                        <td className="p-0 text">
                                            {cert.fullname}
                                        </td>

                                        <td className="p-4">
                                            {cert.programme}
                                        </td>

                                        <td className="p-4">
                                            {cert.award}
                                        </td>

                                        <td className="p-4">
                                            {new Date(cert.graduationDate).toLocaleDateString()}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${cert.status === "issued"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {cert.status}
                                            </span>
                                        </td>

                                        <td className="p-4 flex justify-center gap-4">

                                            <button
                                                title={cert.status === 'revoked' ? 'Already revoked' : 'revoke'}
                                                onClick={() => cert.status !== 'revoked' && handleRevoke(cert._id)}
                                                className={cert.status === 'revoked' ? 'text-gray-500' : 'text-yellow-500 hover:text-yellow-700'}
                                            >
                                                <FaBan />
                                            </button>

                                            <button
                                                title="delete"
                                                onClick={() => handleDelete(cert._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCertificates;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

const VerificationLogs = () => {
    const [verifications, setVerifications] = useState([]);
    const [filteredVerifications, setFilteredVerifications] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [resultFilter, setResultFilter] = useState("all");
    const [deletingId, setDeletingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const getAllVerifications = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/admin/verifications", {
                withCredentials: true,
            });
            
            const data = Array.isArray(res.data) ? res.data : [];
            setVerifications(data);
            setFilteredVerifications(data);
            
        } catch (err) {
            console.log(err);
            if (err.response?.status === 404) {
                toast.error("Verification logs API not yet implemented. Please add the backend endpoint.");
            } else {
                toast.error("Failed to load verification logs");
            }
            setVerifications([]);
            setFilteredVerifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllVerifications();
    }, []);

    useEffect(() => {
        let filtered = [...verifications];

        if (search.trim() !== "") {
            const term = search.toLowerCase();
            filtered = filtered.filter((verif) =>
                verif.searchedNumber?.toLowerCase().includes(term) ||
                verif.holder?.toLowerCase().includes(term) ||
                verif.verifierId?.name?.toLowerCase().includes(term) ||
                verif.verifierId?.email?.toLowerCase().includes(term)
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((verif) => verif.status === statusFilter);
        }

        if (resultFilter !== "all") {
            filtered = filtered.filter((verif) => verif.result === resultFilter);
        }

        setFilteredVerifications(filtered);
        setCurrentPage(1);
    }, [search, verifications, statusFilter, resultFilter]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this verification log permanently?");
        if (!confirmDelete) return;

        try {
            setDeletingId(id);
            const res = await axios.delete(`/api/admin/verifications/${id}`, {
                withCredentials: true
            });
            toast.success(res.data.message);
            getAllVerifications();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete verification log");
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'complete':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">
                    <FaCheckCircle className="inline mr-1" /> Complete
                </span>;
            case 'failed':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">
                    <FaTimesCircle className="inline mr-1" /> Failed
                </span>;
            case 'processing':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-600">
                    <FaClock className="inline mr-1" /> Processing
                </span>;
            default:
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600">{status || 'Unknown'}</span>;
        }
    };

    const getResultBadge = (result) => {
        if (!result) return <span className="text-gray-400">—</span>;
        
        switch(result) {
            case 'valid':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">
                    <FaCheckCircle className="inline mr-1" /> Valid
                </span>;
            case 'invalid':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">
                    <FaTimesCircle className="inline mr-1" /> Invalid
                </span>;
            case 'revoked':
                return <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-600">
                    <FaTimesCircle className="inline mr-1" /> Revoked
                </span>;
            default:
                return <span className="text-gray-400">—</span>;
        }
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString();
    };

    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;
    const currentVerifications = filteredVerifications.slice(firstPostIndex, lastPostIndex);

    if (!Array.isArray(verifications)) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen w-full">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> Invalid data format received from server.
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Verification Logs
                </h1>

                <div className="flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by number, holder, or verifier..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80 border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="complete">Complete</option>
                        <option value="failed">Failed</option>
                        <option value="processing">Processing</option>
                    </select>

                    <select
                        value={resultFilter}
                        onChange={(e) => setResultFilter(e.target.value)}
                        className="border border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                    >
                        <option value="all">All Results</option>
                        <option value="valid">Valid</option>
                        <option value="invalid">Invalid</option>
                        <option value="revoked">Revoked</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                {loading ? (
                    <p className="p-6 text-center">Loading...</p>
                ) : !Array.isArray(filteredVerifications) || filteredVerifications.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        No verification logs found
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-250">
                            <thead className="bg-green-100 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Searched Number</th>
                                    <th className="p-4">Holder</th>
                                    <th className="p-4">Verifier</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Result</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentVerifications.map((verification) => (
                                    <tr
                                        key={verification._id || verification.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium">
                                            {verification.searchedNumber || 'N/A'}
                                        </td>
                                        <td className="p-4">
                                            {verification.holder || <span className="text-gray-400">—</span>}
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <div className="font-medium">
                                                    {verification.verifierId?.name || "Unknown"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {verification.verifierId?.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(verification.status)}
                                        </td>
                                        <td className="p-4">
                                            {getResultBadge(verification.result)}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {formatDate(verification.createdAt)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    title="Delete Log"
                                                    onClick={() => handleDelete(verification._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    disabled={deletingId === verification._id}
                                                >
                                                    {deletingId === verification._id ? (
                                                        <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaTrash />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination 
                            totalItems={filteredVerifications.length} 
                            itemsPerPage={itemsPerPage} 
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationLogs;
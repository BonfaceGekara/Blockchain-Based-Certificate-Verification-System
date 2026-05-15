import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";
import AuthFooter from "../../components/AuthFooter";

const Verifications = () => {

    const navigate = useNavigate();

    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null)

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchVerifications = async () => {
        try {
            setLoading(true);

            const res = await axios.get('/api/verifier/verifications', {
                withCredentials: true
            });

            setVerifications(res.data.verifications);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, []);

    const filtered = verifications.filter((ver) => {

        const searchedNumber = ver?.searchedNumber || "";
        const name = ver?.holder || "";
        const date = ver?.createdAt || "";

        const matchesSearch =
            searchedNumber.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase()) ||
            date.includes(search);

        const matchesStatus = statusFilter === "all" || ver.result === statusFilter;

        return matchesSearch && matchesStatus;
    });

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;

    const currentVerifications = filtered.slice(firstPostIndex, lastPostIndex);

    const handleDelete = async (id, searchedNumber) => {

        const confirmDelete = window.confirm(`Are you sure you want to delete verification for "${searchedNumber}"?`);

        if (!confirmDelete) return;

        try {
            setDeletingId(id);

            await axios.delete(`/api/verifier/verifications/${id}`, {
                withCredentials: true
            });

            setVerifications(prev => prev.filter(v => v._id !== id));
            toast.success('Verification record deleted successfully');

        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to delete verification');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    All Verifications
                </h1>

                <div className="flex gap-3 flex-wrap">

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300"
                    >
                        <option value="all">All</option>
                        <option value="valid">Valid</option>
                        <option value="invalid">Invalid</option>
                        <option value="revoked">Revoked</option>
                    </select>

                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                {loading ? (
                    <p className="p-6 text-center">Loading...</p>
                ) : filtered.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        No verifications found
                    </p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="p-4 text-left">Searched Number</th>
                                    <th className="p-4 text-left">Owner's name</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className='p-4 text-left'>Result</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentVerifications?.length > 0 ? (
                                    currentVerifications.map((ver, index) => (
                                        <tr key={index} className="border-t hover:bg-gray-50 transition">

                                            <td className="p-4 font-medium">
                                                {ver.searchedNumber}
                                            </td>

                                            <td className="p-4">
                                                {ver.holder}
                                            </td>

                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-medium
                                                                    ${ver.status === "complete"
                                                        ? "bg-green-200 text-green-600"
                                                        : "bg-red-200 text-red-600"
                                                    }`}
                                                >
                                                    {ver.status}
                                                </span>
                                            </td>
                                            <td className='p-4'>
                                                <span className={`px-2 py-1 rounded text-xs font-medium
                                                        ${ver.result === "valid" ?
                                                        "bg-green-200 text-green-600"
                                                        : ver.result === 'revoked'
                                                            ? "bg-orange-200 text-orange-600"
                                                            : "bg-red-200 text-red-600"
                                                    }`}
                                                >
                                                    {ver.result}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                {new Date(ver.createdAt).toLocaleDateString()}
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-4">

                                                    <button onClick={() => navigate(`/verification/${ver._id}`)} className="text-blue-500 hover:text-blue-700">
                                                        <FaEye />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(ver._id, ver.searchedNumber)}
                                                        className="text-red-500 hover:text-red-700"
                                                        disabled={deletingId === ver._id}
                                                        title="Delete"
                                                    >
                                                        {deletingId === ver._id ? (
                                                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                                                        ) : (
                                                            <FaTrash />
                                                        )}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-6 text-gray-500">
                                            No verifications found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                        <Pagination totalItems={filtered.length} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                    </div>
                )}

            </div>

            <AuthFooter />

        </div>
    );
};

export default Verifications;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	FaCertificate,
	FaCheckCircle,
	FaPlus,
	FaUsers,
	FaList,
	FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthFooter from "../../components/AuthFooter";

const AdminDashboard = () => {
	const [stats, setStats] = useState({
		totalCertificates: 0,
		verificationsDone: 0
	});
	const [loading, setLoading] = useState(false);
	const [recentVerifications, setRecentVerifications] = useState([]);

	useEffect(() => {
		fetchDashboardStats();
		fetchRecentVerifications();
	}, []);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);
			const [certRes, verifRes] = await Promise.all([
				axios.get("/api/admin/certificates", { withCredentials: true }),
				axios.get("/api/admin/verifications", { withCredentials: true })
			]);

			setStats({
				totalCertificates: certRes.data?.length || 0,
				verificationsDone: verifRes.data?.length || 0
			});
		} catch (err) {
			console.log(err);
			toast.error("Failed to load dashboard stats");
		} finally {
			setLoading(false);
		}
	};

	const fetchRecentVerifications = async () => {
		try {
			const res = await axios.get("/api/admin/verifications", { withCredentials: true });
			const recent = res.data?.slice(0, 5) || [];
			setRecentVerifications(recent);
		} catch (err) {
			console.log(err);
		}
	};

	const getResultBadge = (result) => {
		if (!result) return <span className="text-gray-400">—</span>;

		switch (result) {
			case 'valid':
				return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">Valid</span>;
			case 'invalid':
				return <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">Invalid</span>;
			case 'revoked':
				return <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-600">Revoked</span>;
			default:
				return <span className="text-gray-400">—</span>;
		}
	};

	const formatDate = (date) => {
		if (!date) return 'N/A';
		return new Date(date).toLocaleDateString();
	};

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-gray-800">Welcome, Administrator</h2>
				<p className="text-gray-600 mt-1">Overview of your certificate management system</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Total Certificates</p>
							<p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalCertificates}</p>
						</div>
						<FaCertificate className="text-4xl text-blue-400" />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Verifications Done</p>
							<p className="text-3xl font-bold text-gray-800 mt-2">{stats.verificationsDone}</p>
						</div>
						<FaCheckCircle className="text-4xl text-green-400" />
					</div>
				</div>

				<Link to="/admin/add-certificate" className="bg-linear-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white hover:from-green-600 hover:to-green-700 transition">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm opacity-90">Add New</p>
							<p className="text-xl font-bold mt-2">Certificate</p>
						</div>
						<FaPlus className="text-4xl opacity-50" />
					</div>
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
						<FaChartLine className="text-gray-400" />
					</div>
					<div className="space-y-3">
						<Link to="/admin/manage-certificates" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
							<div className="flex items-center gap-3">
								<FaCertificate className="text-green-500" />
								<span className="text-gray-700">Manage Certificates</span>
							</div>
							<span className="text-green-500">→</span>
						</Link>
						<Link to="/admin/manage-users" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
							<div className="flex items-center gap-3">
								<FaUsers className="text-blue-500" />
								<span className="text-gray-700">Manage Users</span>
							</div>
							<span className="text-green-500">→</span>
						</Link>
						<Link to="/admin/verification-logs" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
							<div className="flex items-center gap-3">
								<FaList className="text-purple-500" />
								<span className="text-gray-700">View Verification Logs</span>
							</div>
							<span className="text-green-500">→</span>
						</Link>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-800">Recent Verifications</h3>
						<Link to="/admin/verification-logs" className="text-sm text-green-600 hover:text-green-700">
							View All →
						</Link>
					</div>
					{recentVerifications.length === 0 ? (
						<p className="text-gray-500 text-center py-8">No verifications yet</p>
					) : (
						<div className="space-y-3">
							{recentVerifications.map((ver) => (
								<div key={ver._id} className="flex items-center justify-between p-3 border-b last:border-0">
									<div>
										<p className="font-medium text-gray-800">{ver.searchedNumber}</p>
										<p className="text-sm text-gray-500">{ver.holder || 'No holder'}</p>
									</div>
									<div className="text-right">
										<div>{getResultBadge(ver.result)}</div>
										<p className="text-xs text-gray-400 mt-1">{formatDate(ver.createdAt)}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<AuthFooter />
		</div>
	);
};

export default AdminDashboard;
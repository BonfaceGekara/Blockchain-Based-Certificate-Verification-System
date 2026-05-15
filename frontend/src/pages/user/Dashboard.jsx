import React, { useState, useEffect, useContext } from 'react';
import { MdVerified, MdHistory, MdPayment } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter';

const Dashboard = () => {

	const { user } = useContext(AuthContext);

	const [stats, setStats] = useState(null);
	const [verifications, setVerifications] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchDashboardDetails = async () => {
		try {
			setLoading(true);

			const res = await axios.get('/api/verifier/dashboard', { withCredentials: true });

			setStats(res.data.stats);
			setVerifications(res.data.verifications);

		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchDashboardDetails();
	},
		[]);

	return (

		<div className="p-6 bg-gray-100 min-h-screen">

			<h1 className="text-2xl font-bold text-gray-800 mb-6">
				Welcome, {user.name}
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

				<div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
					<div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">
						<MdVerified />
					</div>
					<div>
						<p className="text-gray-500 text-sm">Total Verifications</p>
						<h2 className="text-xl font-bold">{stats?.totalVerifications}</h2>
					</div>
				</div>

				<div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
					<div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">
						<MdHistory />
					</div>
					<div>
						<p className="text-gray-500 text-sm">Recent Checks(Last Month)</p>
						<h2 className="text-xl font-bold">{stats?.recentChecks}</h2>
					</div>
				</div>

				<div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
					<div className="bg-yellow-100 p-3 rounded-full text-yellow-600 text-xl">
						<MdPayment />
					</div>
					<div>
						<p className="text-gray-500 text-sm">Total Payments Made</p>
						<h2 className="text-xl font-bold">KES {stats?.totalPayments}</h2>
					</div>
				</div>

			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

				<div className="bg-white p-6 rounded-xl shadow">
					<h2 className="text-lg font-semibold mb-2">
						Verify a Certificate
					</h2>
					<p className="text-gray-500 text-sm mb-4">
						Quickly check if a certificate is valid.
					</p>

					<Link to='/verify' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
						Start Verification
					</Link>
				</div>

				<div className="bg-white p-6 rounded-xl shadow">
					<h2 className="text-lg font-semibold mb-2">
						Payment
					</h2>
					<p className="text-gray-500 text-sm mb-4">
						See more about Payment
					</p>

					<Link to='/payment' className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
						Go to Payments
					</Link>
				</div>

			</div>

			<div className="bg-white rounded-2xl shadow-sm overflow-hidden">

				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-lg font-semibold text-gray-800">
						Recent Verifications
					</h2>

					<Link to='/verifications' className="p-1 rounded-lg bg-blue-400 text-gray-800 text-sm hover:bg-blue-500">
						View All
					</Link>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">

						<thead className="bg-gray-50 text-gray-600">
							<tr>
								<th className="p-4 text-center">Searched Number</th>
								<th className="p-4 text-left">Owner's name</th>
								<th className="p-4 text-left">Status</th>
								<th className='p-4 text-left'>Result</th>
								<th className="p-4 text-left">Date</th>
								<th className="p-4 text-center">Actions</th>
							</tr>
						</thead>

						<tbody>
							{verifications?.length > 0 ? (
								verifications.map((ver, index) => (
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
											${ver.result === "valid"
													? "bg-green-200 text-green-600"
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

												<button className="text-blue-500 hover:text-blue-700">
													<FaEye />
												</button>

												<button className="text-red-500 hover:text-red-700">
													<FaTrash />
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
				</div>

			</div>

			<AuthFooter />

		</div>
	)
}

export default Dashboard;
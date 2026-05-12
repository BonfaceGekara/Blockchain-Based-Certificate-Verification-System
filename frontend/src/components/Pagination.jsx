import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {

	const pages = [];
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	let startPage = currentPage - 2;
	let endPage = currentPage + 2;

	if (startPage < 1) {
		startPage = 1;
		endPage = Math.min(5, totalPages);
	}

	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, totalPages - 4);
	}

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return (
		<div className="flex justify-center items-center gap-2 mt-6 flex-wrap py-2">

			{currentPage > 1 &&
				<button
					onClick={() => setCurrentPage(prev => prev - 1)}
					disabled={currentPage === 1}
					className={`px-3 py-1 rounded-lg ${currentPage === 1
						? "text-gray-400 border-gray-300 cursor-not-allowed"
						: "hover:bg-green-300"
						}`}
				>
					{"<< Previous"}
				</button>
			}

			{
				pages.map((page) => {
					return <button key={page}
						onClick={() => setCurrentPage(page)}
						className={`px-3 py-1 rounded-lg transition ${currentPage === page
							? "bg-green-600 text-white border-green-600"
							: "hover:bg-green-300"
							}`}
					>
						{page}
					</button>
				})
			}

			{currentPage < totalPages &&
				<button
					onClick={() => setCurrentPage(prev => prev + 1)}
					disabled={currentPage === totalPages}
					className={`px-3 py-1 rounded-lg ${currentPage === totalPages
						? "text-gray-400 border-gray-300 cursor-not-allowed"
						: "hover:bg-green-300"
						}`}
				>
					{"Next >>"}
				</button>
			}

		</div>
	)
}

export default Pagination;
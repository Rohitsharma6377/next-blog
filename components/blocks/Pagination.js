import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ total, initialPage, onChange }) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(total);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onChange(pageNumber);
    }
  };

  // Generate page numbers logic with ellipsis
  const generatePages = () => {
    const pages = [];
    const maxDisplayedPages = 10;

    // Show first 5 pages and last 5 pages
    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // First 5 pages
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }

      // Add ellipsis in the middle if necessary
      if (initialPage > 6 && initialPage < totalPages - 4) {
        pages.push("...");
        // Show the current page in the middle
        pages.push(initialPage);
        pages.push("...");
      } else {
        pages.push("...");
      }

      // Last 5 pages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <nav className="m-6">
      <ul className="pagination flex justify-center items-center gap-2">
        <li>
          <button
            className={`bg-gray-light text-black font-bold rounded-xl p-2 pagination-item ${
              initialPage === 1 ? "pagination-item-disabled bg-gray-light text-gray-normal" : ""
            }`}
            onClick={() => handlePageChange(initialPage - 1)}
            disabled={initialPage === 1}
          >
            <MdChevronLeft />
          </button>
        </li>

        {generatePages().map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <button
                className={`font-bold rounded-xl w-10 h-10 pagination-item ${
                  initialPage === page
                    ? "bg-green-500 text-white pagination-item-active"
                    : "bg-primary text-white"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span className="text-gray-normal">...</span>
            )}
          </li>
        ))}

        <li>
          <button
            className={`bg-gray-light text-black font-bold rounded-xl p-2 pagination-item ${
              initialPage === totalPages ? "pagination-item-disabled bg-gray-light text-gray-normal" : ""
            }`}
            onClick={() => handlePageChange(initialPage + 1)}
            disabled={initialPage === totalPages}
          >
            <MdChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
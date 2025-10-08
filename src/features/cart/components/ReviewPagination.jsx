import React from "react";

const ReviewPagination = ({ pagination, page, setPage }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Prev button */}
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`px-3 py-1 border rounded transition-colors ${
          page === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-que-secondary hover:text-white"
        }`}
      >
        Prev
      </button>

      {/* Page numbers */}
      {[...Array(pagination.totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`px-3 py-1 border rounded transition-colors ${
            page === idx + 1
              ? "bg-que-primary text-white"
              : "hover:bg-que-secondary hover:text-white"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        disabled={page === pagination.totalPages}
        onClick={() =>
          setPage((prev) => Math.min(prev + 1, pagination.totalPages))
        }
        className={`px-3 py-1 border rounded transition-colors ${
          page === pagination.totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-que-secondary hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default ReviewPagination;

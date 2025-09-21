import React from "react";

const ReviewPagination = ({ pagination, page, setPage }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Prev button */}
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`px-3 py-1 border rounded ${
          page === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {/* Page numbers */}
      {[...Array(pagination.totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`px-3 py-1 border rounded ${
            page === idx + 1
              ? "bg-primary text-white"
              : "hover:bg-gray-100"
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
        className={`px-3 py-1 border rounded ${
          page === pagination.totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default ReviewPagination;

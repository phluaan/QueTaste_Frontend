// components/Pagination.jsx
const Pagination = ({ page, limit, total, onPageChange }) => {
  if (!total) return null;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Trước
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${
            p === page
              ? "bg-blue-500 text-white border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;

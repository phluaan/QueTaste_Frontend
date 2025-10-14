import { useEffect, useState } from "react";

const Pagination = ({ page, limit, total, onPageChange, onLimitChange }) => {

  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);
  if (!total) return null;

  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit || 10)));
  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onPageChange(next);
  };

  const handlePageInput = (e) => {
    e.preventDefault();
    const p = Number(inputPage);
    if (Number.isFinite(p)) goToPage(p);
    else setInputPage(page); // nếu rỗng/NaN thì trả về trang hiện tại
  };

  // Hiển thị dãy nút số trang
  const visiblePages = [];
  const delta = 2;
  const start = Math.max(1, page - delta);
  const end = Math.min(totalPages, page + delta);

  if (start > 1) visiblePages.push(1);
  if (start > 2) visiblePages.push("...");
  for (let i = start; i <= end; i++) visiblePages.push(i);
  if (end < totalPages - 1) visiblePages.push("...");
  if (end < totalPages) visiblePages.push(totalPages);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
      {/* Bộ chọn limit */}
      <div className="flex items-center gap-2 text-sm">
        <span>Hiển thị:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n} / trang
            </option>
          ))}
        </select>
      </div>

      {/* Điều hướng trang */}
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Trước
        </button>

        {visiblePages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 border rounded ${
                p === page ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Sau
        </button>
      </div>

      {/* Ô nhập trang */}
      <form onSubmit={handlePageInput} className="flex items-center gap-2 text-sm">
        <span>Trang:</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => {
            const v = e.target.value;
            // cho phép rỗng khi đang gõ
            if (v === "") setInputPage("");
            else {
              const num = Number(v);
              // clamp trong [1, totalPages] để không văng ngoài
              setInputPage(Math.max(1, Math.min(totalPages, num)));
            }
          }}
          onBlur={() => {
            if (inputPage === "" || !Number.isFinite(Number(inputPage))) {
              setInputPage(page);
            }
          }}
          className="w-16 border rounded px-2 py-1 text-center"
        />
        <span>/ {totalPages}</span>
        <button
          type="submit"
          className="ml-2 px-3 py-1 border rounded hover:bg-blue-500 hover:text-white"
        >
          Đi
        </button>
      </form>
    </div>
  );
};

export default Pagination;

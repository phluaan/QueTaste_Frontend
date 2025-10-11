const Pagination = ({ currentPage, totalPage, setPage }) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center mt-6 mb-6 gap-2 items-center">
      {/* Nút Previous */}
      <button
        onClick={() => setPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border 
          ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-que-accent hover:text-que-surface"
          } 
          border-que-secondary bg-que-background`}
      >
        &lt;
      </button>

      {/* Trang 1 */}
      <button
        onClick={() => setPage(1)}
        className={`px-3 py-1 rounded border 
          ${
            currentPage === 1
              ? "bg-que-primary text-que-surface"
              : "bg-que-background hover:bg-que-accent hover:text-que-surface"
          } 
          border-que-secondary`}
      >
        1
      </button>

      {/* Dấu ... nếu đang ở trang > 3 */}
      {currentPage > 3 && <span className="px-2">...</span>}

      {/* Các trang lân cận */}
      {Array.from({ length: totalPage }, (_, i) => i + 1)
        .filter(
          (page) =>
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1
        )
        .map(
          (page) =>
            page !== 1 &&
            page !== totalPage && (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`px-3 py-1 rounded border 
                  ${
                    currentPage === page
                      ? "bg-que-primary text-que-surface"
                      : "bg-que-background hover:bg-que-accent hover:text-que-surface"
                  } 
                  border-que-secondary`}
              >
                {page}
              </button>
            )
        )}

      {/* Dấu ... nếu còn trang ẩn trước trang cuối */}
      {currentPage < totalPage - 2 && <span className="px-2">...</span>}

      {/* Trang cuối */}
      {totalPage > 1 && (
        <button
          onClick={() => setPage(totalPage)}
          className={`px-3 py-1 rounded border 
            ${
              currentPage === totalPage
                ? "bg-que-primary text-que-surface"
                : "bg-que-background hover:bg-que-accent hover:text-que-surface"
            } 
            border-que-secondary`}
        >
          {totalPage}
        </button>
      )}

      {/* Nút Next */}
      <button
        onClick={() => setPage(Math.min(currentPage + 1, totalPage))}
        disabled={currentPage === totalPage}
        className={`px-3 py-1 rounded border 
          ${
            currentPage === totalPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-que-accent hover:text-que-surface"
          } 
          border-que-secondary bg-que-background`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

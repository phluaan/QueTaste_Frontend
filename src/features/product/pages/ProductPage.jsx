import React from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer"; // thêm import

const ProductPage = () => {
  const {
    search, setSearch,
    filterCriteria, setFilterCriteria,
    priceFilter, setPriceFilter,
    ratingFilter, setRatingFilter,
    regionFilter, setRegionFilter,
    products,
    loading,
    totalPage, currentPage, setPage
  } = useProduct();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white p-4 rounded-lg shadow mb-6 mt-20">
          {/* Thanh tìm kiếm */}
          <div className="flex items-center gap-2 w-full max-w-md mb-4">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded px-4 py-2"
            />
            <button className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>

          {/* Bộ lọc cùng 1 hàng */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Tiêu chí</option>
              <option value="newest">Mới</option>
              <option value="best">Bán chạy</option>
              <option value="views">Lượt xem</option>
              <option value="discount">Khuyến mãi</option>
            </select>

            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full border rounded px-3 py-2"
              >
              <option value="">Giá cả</option>
              <option value="lt100">Thấp hơn 100k</option>
              <option value="100-200">Từ 100k đến 200k</option>
              <option value="200-500">Từ 200k đến 500k</option>
              <option value="gt500">Lớn hơn 500k</option>
            </select>

            <select 
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full border rounded px-3 py-2"
              >
              <option value="">Đánh giá</option>
              <option value="5">⭐ 5 sao</option>
              <option value="4">⭐ 4 sao trở lên</option>
              <option value="3">⭐ 3 sao trở lên</option>
              <option value="2">⭐ 2 sao trở lên</option>
              <option value="1">⭐ 1 sao trở lên</option>
            </select>

            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full border rounded px-3 py-2"
              >
              <option value="">Vùng miền</option>
              <option value="north">Miền Bắc</option>
              <option value="central">Miền Trung</option>
              <option value="south">Miền Nam</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading[filterCriteria || "all"] ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} p={p} />)
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 mb-6 gap-2 items-center">
        {/* Nút Previous */}
        <button
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border 
            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FF7E67] hover:text-white"} 
            border-[#A2D5F2] bg-[#FAFAFA]`}
        >
          &lt;
        </button>

        {/* Trang 1 */}
        <button
          onClick={() => setPage(1)}
          className={`px-3 py-1 rounded border 
            ${currentPage === 1 ? "bg-[#07689F] text-white" : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"} 
            border-[#A2D5F2]`}
        >
          1
        </button>

        {/* Dấu ... nếu đang ở trang > 3 */}
        {currentPage > 3 && <span className="px-2">...</span>}

        {/* Trang lân cận */}
        {Array.from({ length: totalPage }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === currentPage ||
              page === currentPage - 1 ||
              page === currentPage + 1
          )
          .map((page) => (
            page !== 1 && page !== totalPage && (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`px-3 py-1 rounded border 
                  ${currentPage === page ? "bg-[#07689F] text-white" : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"} 
                  border-[#A2D5F2]`}
              >
                {page}
              </button>
            )
          ))}

        {/* Dấu ... nếu còn trang ẩn trước trang cuối */}
        {currentPage < totalPage - 2 && <span className="px-2">...</span>}

        {/* Trang cuối */}
        {totalPage > 1 && (
          <button
            onClick={() => setPage(totalPage)}
            className={`px-3 py-1 rounded border 
              ${currentPage === totalPage ? "bg-[#07689F] text-white" : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"} 
              border-[#A2D5F2]`}
          >
            {totalPage}
          </button>
        )}

        {/* Nút Next */}
        <button
          onClick={() => setPage(Math.min(currentPage + 1, totalPage))}
          disabled={currentPage === totalPage}
          className={`px-3 py-1 rounded border 
            ${currentPage === totalPage ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FF7E67] hover:text-white"} 
            border-[#A2D5F2] bg-[#FAFAFA]`}
        >
          &gt;
        </button>
      </div>


      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ProductPage;
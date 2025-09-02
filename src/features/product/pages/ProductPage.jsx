import React from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer"; // thêm import

const ProductPage = () => {
  const {
    search,
    setSearch,
    filterCriteria,
    setFilterCriteria,
    displayedProducts,
    loading,
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
            <button className="text-indigo-600">
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
              <option value="newest">8 sản phẩm mới nhất</option>
              <option value="best">6 sản phẩm bán chạy</option>
              <option value="views">8 sản phẩm xem nhiều</option>
              <option value="discount">4 sản phẩm khuyến mãi</option>
            </select>

            <select className="w-full border rounded px-3 py-2">
              <option value="">Giá cả</option>
              <option value="low-high">Thấp hơn 100k</option>
              <option value="low-high">Từ 100k đến 200k</option>
              <option value="low-high">Từ 200k đến 500k</option>
              <option value="low-high">Lớn hơn 500k</option>
            </select>

            <select className="w-full border rounded px-3 py-2">
              <option value="">Đánh giá</option>
              <option value="5">⭐ 5 sao</option>
              <option value="4">⭐ 4 sao trở lên</option>
              <option value="3">⭐ 3 sao trở lên</option>
              <option value="2">⭐ 2 sao trở lên</option>
              <option value="1">⭐ 1 sao trở lên</option>
            </select>

            <select className="w-full border rounded px-3 py-2">
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
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((p) => <ProductCard key={p._id} p={p} />)
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ProductPage;
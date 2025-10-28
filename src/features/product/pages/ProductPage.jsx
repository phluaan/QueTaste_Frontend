import React from "react";
import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import { suggestProductsApi } from "../services/productService";
import { useEffect, useState, useRef } from "react";

const useDebounce = (value, delay = 250) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
};

const ProductPage = () => {
  const {
    search,
    setSearch,
    filterCriteria,
    setFilterCriteria,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    setRatingFilter,
    regionFilter,
    setRegionFilter,
    categoryFilter, 
    setCategoryFilter,
    products,
    loading,
    totalPage,
    currentPage,
    setPage,
  } = useProduct();

  const [open, setOpen] = useState(false);
  const [suggests, setSuggests] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const boxRef = useRef(null);
  const debounced = useDebounce(search, 250);

  useEffect(() => {
    let mounted = true;
    const fetchSuggest = async () => {
      if (!debounced || debounced.trim().length < 2) {
        setSuggests([]);
        setOpen(false);
        return;
      }
      try {
        const { data, success } = await suggestProductsApi(debounced, 8);
        if (!mounted) return;
        if (success) {
          setSuggests(data || []);
          setOpen((data || []).length > 0);
          setActiveIdx(-1);
        } else {
          setSuggests([]);
          setOpen(false);
        }
      } catch {
        if (!mounted) return;
        setSuggests([]);
        setOpen(false);
      }
    };
    fetchSuggest();
    return () => {
      mounted = false;
    };
  }, [debounced]);

  // click outside -> đóng
  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onKeyDown = (e) => {
    if (!open || suggests.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % suggests.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + suggests.length) % suggests.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = suggests[activeIdx] || suggests[0];
      if (pick) {
        setSearch(pick.name);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-que-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-que-surface p-4 rounded-lg shadow mb-6">
          {/* Thanh tìm kiếm */}
          <div className="relative w-full max-w-md mb-4" ref={boxRef}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => suggests.length > 0 && setOpen(true)}
                onKeyDown={onKeyDown}
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-que-accent"
              />
              <button className="text-que-text-main" aria-label="Search">
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

            {open && suggests.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full bg-white border rounded shadow max-h-80 overflow-auto">
                {suggests.map((s, idx) => (
                  <li
                    key={s._id}
                    onMouseDown={(e) => {
                      // dùng mousedown để không bị blur trước khi click
                      e.preventDefault();
                      setSearch(s.name);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 p-2 cursor-pointer ${
                      idx === activeIdx
                        ? "bg-que-accent/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* ảnh nhỏ */}
                    {s.images?.[0] ? (
                      <img
                        src={s.images[0]}
                        alt={s.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">
                        {s.salePrice > 0
                          ? s.salePrice.toLocaleString()
                          : s.price?.toLocaleString()}
                        đ
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bộ lọc cùng 1 hàng */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Tất cả danh mục</option>
              <option value="Trái cây">Trái cây</option>
              <option value="Đồ uống">Đồ uống</option>
              <option value="Hải sản">Hải sản</option>
              <option value="Bánh kẹo">Bánh kẹo</option>
              <option value="Đặc sản">Đặc sản</option>
              <option value="Gia vị">Gia vị</option>
              <option value="Nông sản">Nông sản</option>
            </select>
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
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
              <option value="">Tỉnh/Thành phố</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
              <option value="Bạc Liêu">Bạc Liêu</option>
              <option value="Bắc Giang">Bắc Giang</option>
              <option value="Bắc Kạn">Bắc Kạn</option>
              <option value="Bắc Ninh">Bắc Ninh</option>
              <option value="Bến Tre">Bến Tre</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Bình Định">Bình Định</option>
              <option value="Bình Phước">Bình Phước</option>
              <option value="Bình Thuận">Bình Thuận</option>
              <option value="Cà Mau">Cà Mau</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Cao Bằng">Cao Bằng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Đắk Lắk">Đắk Lắk</option>
              <option value="Đắk Nông">Đắk Nông</option>
              <option value="Điện Biên">Điện Biên</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Đồng Tháp">Đồng Tháp</option>
              <option value="Gia Lai">Gia Lai</option>
              <option value="Hà Giang">Hà Giang</option>
              <option value="Hà Nam">Hà Nam</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hà Tĩnh">Hà Tĩnh</option>
              <option value="Hải Dương">Hải Dương</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Hậu Giang">Hậu Giang</option>
              <option value="Hòa Bình">Hòa Bình</option>
              <option value="Hưng Yên">Hưng Yên</option>
              <option value="Khánh Hòa">Khánh Hòa</option>
              <option value="Kiên Giang">Kiên Giang</option>
              <option value="Kon Tum">Kon Tum</option>
              <option value="Lai Châu">Lai Châu</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Lạng Sơn">Lạng Sơn</option>
              <option value="Lào Cai">Lào Cai</option>
              <option value="Long An">Long An</option>
              <option value="Nam Định">Nam Định</option>
              <option value="Nghệ An">Nghệ An</option>
              <option value="Ninh Bình">Ninh Bình</option>
              <option value="Ninh Thuận">Ninh Thuận</option>
              <option value="Phú Thọ">Phú Thọ</option>
              <option value="Phú Yên">Phú Yên</option>
              <option value="Quảng Bình">Quảng Bình</option>
              <option value="Quảng Nam">Quảng Nam</option>
              <option value="Quảng Ngãi">Quảng Ngãi</option>
              <option value="Quảng Ninh">Quảng Ninh</option>
              <option value="Quảng Trị">Quảng Trị</option>
              <option value="Sóc Trăng">Sóc Trăng</option>
              <option value="Sơn La">Sơn La</option>
              <option value="Tây Ninh">Tây Ninh</option>
              <option value="Thái Bình">Thái Bình</option>
              <option value="Thái Nguyên">Thái Nguyên</option>
              <option value="Thanh Hóa">Thanh Hóa</option>
              <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
              <option value="Tiền Giang">Tiền Giang</option>
              <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
              <option value="Trà Vinh">Trà Vinh</option>
              <option value="Tuyên Quang">Tuyên Quang</option>
              <option value="Vĩnh Long">Vĩnh Long</option>
              <option value="Vĩnh Phúc">Vĩnh Phúc</option>
              <option value="Yên Bái">Yên Bái</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {loading.list ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} p={p} />)
          ) : (
            <p className="text-que-text-muted">Không có sản phẩm nào</p>
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
            ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-que-accent hover:text-white"
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
                ? "bg-que-primary text-white"
                : "bg-que-background hover:bg-que-accent hover:text-white"
            } 
            border-que-secondary`}
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
                      ? "bg-que-primary text-white"
                      : "bg-que-background hover:bg-que-accent hover:text-white"
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
                  ? "bg-que-primary text-white"
                  : "bg-que-background hover:bg-que-accent hover:text-white"
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
                : "hover:bg-que-accent hover:text-white"
            } 
            border-que-secondary bg-que-background`}
        >
          &gt;
        </button>
      </div>
    </main>
  );
};

export default ProductPage;

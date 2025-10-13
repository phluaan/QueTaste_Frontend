import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ProductStats from "../components/ProductStats";
import ProductTable from "../components/ProductTable";
import ProductDetailModal from "../components/ProductDetailModal";
import Pagination from "../../../../components/Pagination";
import useAdminProducts from "../hooks/useAdminProducts";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import ConfirmModal from "../../../../components/ConfirmModal";

export default function AdminProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
    category: "",
    region: "",
    rating: "",
    sortBy: "createdAt",
    order: "desc",
    minPrice: "",
    maxPrice: "",
  });

  const {
    products,
    pagination,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleActiveProduct,
    getProductById,
  } = useAdminProducts(filters);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const stats = {
    total: pagination?.total ?? 0,
    active: products.filter((p) => p.isActive).length,
    inactive: products.filter((p) => !p.isActive).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === "create") {
        await createProduct(formData);
        setFilters((f) => ({ ...f, page: 1 }));
      }
      if (modalMode === "edit" && selectedProduct?._id) {
        await updateProduct({ id: selectedProduct._id, formData });
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((f) => ({ ...f, [name]: value, page: 1 }));
  };

  const handlePriceFilter = (range) => {
    switch (range) {
      case "lt100":
        setFilters((f) => ({ ...f, minPrice: "", maxPrice: 100000 }));
        break;
      case "100-200":
        setFilters((f) => ({ ...f, minPrice: 100000, maxPrice: 200000 }));
        break;
      case "200-500":
        setFilters((f) => ({ ...f, minPrice: 200000, maxPrice: 500000 }));
        break;
      case "gt500":
        setFilters((f) => ({ ...f, minPrice: 500000, maxPrice: "" }));
        break;
      default:
        setFilters((f) => ({ ...f, minPrice: "", maxPrice: "" }));
    }
  };

  const handleDeleteRequest = (id) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteProduct(productToDelete);
    setConfirmOpen(false);
    setProductToDelete(null);

    if (products.length === 1 && (pagination?.page ?? filters.page) > 1) {
      setFilters((f) => ({ ...f, page: (pagination?.page ?? f.page) - 1 }));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Quản lý sản phẩm</h1>

        <ProductStats stats={stats} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="border rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setSelectedProduct(null);
              setModalMode("create");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Thêm sản phẩm
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="border rounded px-3 py-2"
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
            onChange={(e) => handlePriceFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Giá cả</option>
            <option value="lt100">Thấp hơn 100k</option>
            <option value="100-200">Từ 100k đến 200k</option>
            <option value="200-500">Từ 200k đến 500k</option>
            <option value="gt500">Lớn hơn 500k</option>
          </select>

          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Đánh giá</option>
            <option value="5">⭐ 5 sao</option>
            <option value="4">⭐ 4 sao trở lên</option>
            <option value="3">⭐ 3 sao trở lên</option>
            <option value="2">⭐ 2 sao trở lên</option>
            <option value="1">⭐ 1 sao trở lên</option>
          </select>

          <select
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
            className="border rounded px-3 py-2"
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

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="createdAt">Mới nhất</option>
            <option value="totalSold">Bán chạy</option>
            <option value="views">Lượt xem</option>
            <option value="price">Giá</option>
            <option value="rating">Đánh giá</option>
          </select>

          <select
            value={filters.order}
            onChange={(e) => handleFilterChange("order", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="desc">Giảm dần</option>
            <option value="asc">Tăng dần</option>
          </select>
        </div>

        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <>
            <ProductTable
              products={products}
              onViewDetail={async (p) => {
                const res = await getProductById(p._id);
                setSelectedProduct(res.payload);
                setModalMode("view");
              }}
              onToggleActive={toggleActiveProduct}
              onDelete={handleDeleteRequest}
            />

            {modalMode && (
              <ProductDetailModal
                product={selectedProduct}
                mode={modalMode}
                onModeChange={setModalMode}
                onClose={() => {
                  setSelectedProduct(null);
                  setModalMode(null);
                }}
                onSave={handleSave}
                globalLoading={loading}
              />
            )}

            <Pagination
              page={pagination?.page || filters.page}
              limit={pagination?.limit || filters.limit}
              total={pagination?.total || 0}
              onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
              onLimitChange={(l) =>
                setFilters((f) => ({ ...f, limit: l, page: 1 }))
              }
            />
          </>
        )}
        <LoadingOverlay show={loading} />

        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Bạn có chắc chắn muốn xóa sản phẩm này?"
        />
      </div>
    </AdminLayout>
  );
}

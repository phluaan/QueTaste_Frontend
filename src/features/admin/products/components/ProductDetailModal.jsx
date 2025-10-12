import { useState, useEffect } from "react";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import vietnamProvinces from "../../../../data/vietnamProvinces.json";
import categoriesData from "../../../../data/category.json";

export default function ProductDetailModal({
  product,
  onClose,
  onSave,
  mode = "view",
  globalLoading = false,
  onModeChange,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    salePrice: "",
    stock: "",
    category: "",
    region: "",
    description: "",
    images: [],
    newImages: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [currentMode, setCurrentMode] = useState(mode);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        salePrice: product.salePrice || "",
        stock: product.stock || "",
        category: product.category || "",
        region: product.region || "",
        description: product.description || "",
        images: product.images || [],
        newImages: [],
      });
      setPreviewImages(product.images || []);
    }
    setCategories(categoriesData || []);
    setRegions(vietnamProvinces || []);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((f) => ({ ...f, newImages: files }));
    setPreviewImages([
      ...(form.images || []),
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    if (index < form.images.length) {
      const updated = form.images.filter((_, i) => i !== index);
      setForm((f) => ({ ...f, images: updated }));
    } else {
      const newIndex = index - form.images.length;
      const updatedNew = form.newImages.filter((_, i) => i !== newIndex);
      setForm((f) => ({ ...f, newImages: updatedNew }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "newImages" && form.newImages.length > 0) {
          form.newImages.forEach((file) => data.append("images", file));
        } else if (key === "images") {
          data.append("existingImages", JSON.stringify(form.images));
        } else if (form[key] !== undefined && form[key] !== null) {
          data.append(key, form[key]);
        }
      });

      await onSave(data);
      setCurrentMode("view");
      onModeChange?.("view");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!product && currentMode !== "create") return null;
  const isView = currentMode === "view";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        <LoadingOverlay show={loading || globalLoading} />

        {/* Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-que-primary">
          {currentMode === "create"
            ? "Thêm sản phẩm mới"
            : currentMode === "edit"
            ? "Chỉnh sửa sản phẩm"
            : "Chi tiết sản phẩm"}
        </h2>

        {/* ----- Khối thông tin chỉ xem (đã thêm lại đầy đủ) ----- */}
        {product && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-4 text-sm">
            <div>
              <div className="text-gray-500">Mã sản phẩm</div>
              <div className="font-medium break-all">{product._id}</div>
            </div>
            <div>
              <div className="text-gray-500">Trạng thái</div>
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs ${
                    product.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {product.isActive ? "Đang hiển thị" : "Đã ẩn"}
                </span>
              </div>
            </div>
            <div>
              <div className="text-gray-500">Lượt bán</div>
              <div className="font-medium">{product.totalSold ?? 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Lượt xem</div>
              <div className="font-medium">{product.views ?? 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Đánh giá TB</div>
              <div className="font-medium">
                {product.avgRating ? `${product.avgRating.toFixed(1)} / 5 ⭐` : "Chưa có"}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Tổng đánh giá</div>
              <div className="font-medium">{product.totalReviews ?? 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Ngày tạo</div>
              <div className="font-medium">
                {product.createdAt ? new Date(product.createdAt).toLocaleString() : "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Cập nhật gần nhất</div>
              <div className="font-medium">
                {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "-"}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
          {/* ----- Field nhập liệu/ chỉnh sửa ----- */}
          <div>
            <label className="font-medium">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          {/* Danh mục (select) */}
          <div>
            <label className="font-medium">Danh mục</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded bg-white"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Giá gốc (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="font-medium">Giá khuyến mãi (VNĐ)</label>
            <input
              type="number"
              name="salePrice"
              value={form.salePrice}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="font-medium">Tồn kho</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          {/* Khu vực (select 63 tỉnh) */}
          <div>
            <label className="font-medium">Khu vực</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded bg-white"
            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Mô tả sản phẩm</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isView}
              className="w-full border px-2 py-1 rounded h-24 resize-none"
            ></textarea>
          </div>

          {/* Ảnh sản phẩm */}
          <div className="col-span-2">
            <label className="font-medium">Ảnh sản phẩm</label>
            {!isView && (
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full border p-1 rounded mb-2"
              />
            )}
            <div className="flex flex-wrap gap-3">
              {previewImages.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    alt="Ảnh sản phẩm"
                    className="w-24 h-24 object-cover rounded border"
                  />
                  {!isView && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      title="Xóa ảnh"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Đóng
            </button>

            {isView && (
              <button
                type="button"
                onClick={() => {
                  setCurrentMode("edit");
                  onModeChange?.("edit");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Chỉnh sửa
              </button>
            )}

            {!isView && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Lưu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

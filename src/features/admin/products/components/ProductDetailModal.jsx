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

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Thông báo tối thiểu (có thể thay bằng toast lib)
  const notify = (msg, type = "info") => {
    // Ví dụ: alert, có thể thay bằng toast.success/toast.error
    alert(`${type.toUpperCase()}: ${msg}`);
  };

  const isCreate = currentMode === "create";
  const isView = currentMode === "view";

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price ?? "",
        salePrice: product.salePrice ?? "",
        stock: product.stock ?? "",
        category: product.category || "",
        region: product.region || "",
        description: product.description || "",
        images: product.images || [],
        newImages: [],
      });
      setPreviewImages(product.images || []);
    } else if (mode === "create") {
      // reset khi tạo mới
      setForm((f) => ({
        ...f,
        name: "",
        price: "",
        salePrice: "",
        stock: "",
        category: "",
        region: "",
        description: "",
        images: [],
        newImages: [],
      }));
      setPreviewImages([]);
    }

    setCategories(categoriesData || []);
    setRegions(vietnamProvinces || []);
  }, [product, mode]);

  // --------- VALIDATION ---------
  const validate = (state) => {
    const MAX_IMAGES = 6;
    const MAX_IMG_SIZE = 2 * 1024 * 1024; // 2MB
    const nextErrors = {};

    // name
    if (!state.name?.trim()) {
      nextErrors.name = "Tên sản phẩm là bắt buộc.";
    } else if (state.name.trim().length < 2) {
      nextErrors.name = "Tên sản phẩm phải có ít nhất 2 ký tự.";
    }

    // category
    if (!state.category) {
      nextErrors.category = "Vui lòng chọn danh mục.";
    }

    // price
    const priceNum = Number(state.price);
    if (state.price === "" || state.price === null) {
      nextErrors.price = "Giá gốc là bắt buộc.";
    } else if (Number.isNaN(priceNum) || priceNum <= 0) {
      nextErrors.price = "Giá gốc phải là số > 0.";
    }

    // salePrice
    if (state.salePrice !== "" && state.salePrice !== null) {
      const saleNum = Number(state.salePrice);
      if (Number.isNaN(saleNum) || saleNum < 0) {
        nextErrors.salePrice = "Giá khuyến mãi phải là số ≥ 0.";
      } else if (!Number.isNaN(priceNum) && saleNum > priceNum) {
        nextErrors.salePrice = "Giá khuyến mãi không được lớn hơn giá gốc.";
      }
    }

    // stock
    const stockNum = Number(state.stock);
    if (state.stock === "" || state.stock === null) {
      nextErrors.stock = "Tồn kho là bắt buộc.";
    } else if (!Number.isInteger(stockNum) || stockNum < 0) {
      nextErrors.stock = "Tồn kho phải là số nguyên ≥ 0.";
    }

    // region
    if (!state.region) {
      nextErrors.region = "Vui lòng chọn khu vực.";
    }

    // description
    if (state.description && state.description.length > 1000) {
      nextErrors.description = "Mô tả tối đa 1000 ký tự.";
    }

    // images (count/type/size)
    const existingCount = state.images?.length ?? 0;
    const newCount = state.newImages?.length ?? 0;
    const totalCount = existingCount + newCount;

    if (totalCount > MAX_IMAGES) {
      nextErrors.images = `Tối đa ${MAX_IMAGES} ảnh cho mỗi sản phẩm.`;
    }

    if (newCount > 0) {
      for (const file of state.newImages) {
        if (!file.type.startsWith("image/")) {
          nextErrors.images = "Chỉ cho phép tải lên tệp hình ảnh.";
          break;
        }
        if (file.size > MAX_IMG_SIZE) {
          nextErrors.images = "Mỗi ảnh không vượt quá 2MB.";
          break;
        }
      }
    }

    // Yêu cầu có ít nhất 1 ảnh khi tạo mới
    if (isCreate && totalCount === 0) {
      nextErrors.images = "Vui lòng thêm ít nhất 1 ảnh sản phẩm.";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // validate theo field khi đang edit
      setErrors((prevErr) => {
        const v = validate(next);
        return { ...prevErr, [name]: v[name] };
      });
      return next;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => {
      const v = validate(form);
      return { ...prev, [name]: v[name] };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setForm((f) => {
      const next = { ...f, newImages: files };
      // cập nhật preview
      setPreviewImages([
        ...(next.images || []),
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
      // validate immediate
      const v = validate(next);
      setErrors((prev) => ({ ...prev, images: v.images }));
      setTouched((t) => ({ ...t, images: true }));
      return next;
    });
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    if (index < form.images.length) {
      const updated = form.images.filter((_, i) => i !== index);
      setForm((f) => {
        const next = { ...f, images: updated };
        const v = validate(next);
        setErrors((prev) => ({ ...prev, images: v.images }));
        return next;
      });
    } else {
      const newIndex = index - form.images.length;
      const updatedNew = form.newImages.filter((_, i) => i !== newIndex);
      setForm((f) => {
        const next = { ...f, newImages: updatedNew };
        const v = validate(next);
        setErrors((prev) => ({ ...prev, images: v.images }));
        return next;
      });
    }
    setTouched((t) => ({ ...t, images: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      price: true,
      salePrice: true,
      stock: true,
      category: true,
      region: true,
      description: true,
      images: true,
    });

    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length > 0) {
      notify("Vui lòng kiểm tra lại các trường bị lỗi.", "error");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      // Gộp form thành payload
      Object.keys(form).forEach((key) => {
        if (key === "newImages" && form.newImages.length > 0) {
          form.newImages.forEach((file) => data.append("images", file));
        } else if (key === "images") {
          data.append("existingImages", JSON.stringify(form.images || []));
        } else if (form[key] !== undefined && form[key] !== null) {
          data.append(key, form[key]);
        }
      });

      await onSave(data);
      notify(isCreate ? "Thêm sản phẩm thành công." : "Cập nhật sản phẩm thành công.", "success");
      setCurrentMode("view");
      onModeChange?.("view");
    } catch (err) {
      console.error(err);
      notify(err?.message || "Có lỗi xảy ra khi lưu sản phẩm.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!product && currentMode !== "create") return null;

  const fieldCls = (name) =>
    `w-full border px-2 py-1 rounded ${errors[name] && (touched[name] || isCreate) ? "border-red-500" : "border-gray-300"}`;

  const HelpText = ({ name }) =>
    errors[name] && (touched[name] || isCreate) ? (
      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
    ) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-6 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        <LoadingOverlay show={loading || globalLoading} />

        {/* Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
          type="button"
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

        {product && currentMode !== "create" && (
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
                    product.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
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

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm" noValidate>
          {/* ----- Field nhập liệu/ chỉnh sửa ----- */}
          <div>
            <label className="font-medium">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={fieldCls("name")}
              aria-invalid={!!errors.name}
            />
            <HelpText name="name" />
          </div>

          {/* Danh mục (select) */}
          <div>
            <label className="font-medium">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={`${fieldCls("category")} bg-white`}
              aria-invalid={!!errors.category}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <HelpText name="category" />
          </div>

          <div>
            <label className="font-medium">
              Giá gốc (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={fieldCls("price")}
              aria-invalid={!!errors.price}
              min="0"
              step="1000"
              inputMode="numeric"
            />
            <HelpText name="price" />
          </div>

          <div>
            <label className="font-medium">Giá khuyến mãi (VNĐ)</label>
            <input
              type="number"
              name="salePrice"
              value={form.salePrice}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={fieldCls("salePrice")}
              aria-invalid={!!errors.salePrice}
              min="0"
              step="1000"
              inputMode="numeric"
            />
            <HelpText name="salePrice" />
          </div>

          <div>
            <label className="font-medium">
              Tồn kho <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={fieldCls("stock")}
              aria-invalid={!!errors.stock}
              min="0"
              step="1"
              inputMode="numeric"
            />
            <HelpText name="stock" />
          </div>

          {/* Khu vực (select 63 tỉnh) */}
          <div>
            <label className="font-medium">
              Khu vực <span className="text-red-500">*</span>
            </label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={`${fieldCls("region")} bg-white`}
              aria-invalid={!!errors.region}
            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <HelpText name="region" />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Mô tả sản phẩm</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isView}
              className={`${fieldCls("description")} h-24 resize-none`}
              aria-invalid={!!errors.description}
              maxLength={1000}
            ></textarea>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mô tả tối đa 1000 ký tự.</span>
              <span>{(form.description || "").length}/1000</span>
            </div>
            <HelpText name="description" />
          </div>

          {/* Ảnh sản phẩm */}
          <div className="col-span-2">
            <label className="font-medium">
              Ảnh sản phẩm{isCreate ? <span className="text-red-500"> *</span> : null}
            </label>
            {!isView && (
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={`block w-full border p-1 rounded mb-2 ${
                  errors.images && touched.images ? "border-red-500" : "border-gray-300"
                }`}
                accept="image/*"
              />
            )}
            <HelpText name="images" />

            <div className="flex flex-wrap gap-3 mt-2">
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
              disabled={loading}
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
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

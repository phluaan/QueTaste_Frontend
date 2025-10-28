import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../cart/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, showError } from "../../../utils/toastUtils";
import { useNavigate, useLocation } from "react-router-dom";

const ProductCard = ({ p }) => {
  const img =
    p?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image";
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = () => {
    if (!accessToken) {
      showError("Please login to continue");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!p) {
      showError("Product not found!");
      return;
    }

    if (p.stock <= 0) {
      showError("Out of stock!");
      return;
    }

    dispatch(
      addToCart({
        productId: p._id,
        name: p.name,
        price: p.price,
        salePrice: p.salePrice,
        quantity: 1,
        image: p.images?.[0],
      })
    );

    showSuccess(`${p.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="bg-que-surface rounded-lg shadow-md overflow-hidden transform transition duration-150 hover:shadow-2xl hover:scale-105 flex flex-col">
      {/* Ảnh + link */}
      <Link to={`/product/${p._id}`} className="flex-1">
        <img src={img} alt={p.name} className="h-40 w-full object-cover" />
        <div className="p-3">
          {/* Tên sản phẩm */}
          <h3 className="text-sm font-semibold line-clamp-2 text-que-text-main">
            {p.name}
          </h3>

          {/* Danh mục + vùng miền */}
          <p className="text-xs text-que-text-muted mt-1">
            {p.category || "Đặc sản"} · {p.region || "Việt Nam"}
          </p>

          {/* Giá */}
          <div className="mt-2">
            {p.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-que-danger">
                  {p.salePrice.toLocaleString()} ₫
                </span>
                <span className="line-through text-xs text-que-text-muted">
                  {p.price.toLocaleString()} ₫
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-que-text-main">
                {p.price?.toLocaleString()} ₫
              </span>
            )}
          </div>

          {/* Thông tin phụ */}
          <div className="flex justify-between items-center text-xs text-que-text-muted mt-2">
            <span>{p.totalSold ?? 0} đã bán</span>
            <span>{p.stock ?? 0} có sẵn</span>
          </div>
          <div className="flex justify-between items-center text-xs text-que-text-muted">
            <span>{p.views ?? 0} 👁</span>
            <span>⭐ {p.averageRating?.toFixed(1) ?? 0}</span>
          </div>
        </div>
      </Link>

      {/* Nút Add to Cart */}
      <div className="p-3 border-t">
        <button
          onClick={handleAddToCart}
          className="w-full bg-que-primary text-que-surface text-sm py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

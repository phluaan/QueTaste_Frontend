import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ p }) => {
  const img =
    p?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-150 hover:shadow-2xl hover:scale-105">
      <Link to={`/product/${p._id}`}>
        <img
          src={img}
          alt={p.name}
          className="h-40 w-full object-cover"
        />
        <div className="p-3">
          <h3 className="text-sm font-semibold line-clamp-2 text-black">
            {p.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {p.category || "Đặc sản"}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-black">
              {p.price?.toLocaleString() || "--"} ₫
            </span>
            <span className="text-xs text-gray-500">{p.views ?? 0} 👁</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

// src/features/products/components/ProductDetailTabs.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useReview from "../../review/hooks/useReview";
import ReviewItem from "../../review/components/ReviewItem";
import ReviewPagination from "../../cart/components/ReviewPagination";

const ProductDetailTabs = ({ activeTab, setActiveTab, productDetail }) => {
  const [rating, setRating] = useState(null);
  const [orderBy, setOrderBy] = useState("newest");
  const [page, setPage] = useState(1);

  const { reviews, pagination, loading, error } = useReview(
    productDetail._id,
    rating,
    orderBy,
    page,
    10
  );

  return (
    <div className="mt-16">
      <div className="flex space-x-8 border-b">
        {["description", "reviews", "shipping"].map((tab) => (
          <button
            key={tab}
            className={`pb-4 ${
              activeTab === tab
                ? "border-b-2 border-que-primary text-que-primary"
                : "text-que-text-muted"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === "description" && (
          <p className="text-que-text-main">{productDetail.description}</p>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>

            {/* Bộ lọc reviews */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* ⭐ Lọc theo rating */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className={`px-3 py-1 rounded ${
                    rating === null
                      ? "bg-que-primary text-que-surface"
                      : "bg-que-background"
                  }`}
                  onClick={() => setRating(null)}
                >
                  All
                </button>
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`px-3 py-1 rounded flex items-center space-x-1 ${
                      rating === star
                        ? "bg-que-primary text-que-surface"
                        : "bg-que-background"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    <span>{star}</span>
                    <FaStar className="text-que-accent" />
                  </button>
                ))}
              </div>

              {/* 🕒 Lọc theo thời gian */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-que-text-main">Sắp xếp:</label>
                <select
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="border rounded-lg px-3 py-1 text-sm"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>
              </div>
            </div>

            {loading && <p>Loading reviews...</p>}
            {error && <p className="text-que-danger">{error}</p>}

            {(!reviews || reviews.length === 0) && !loading ? (
              <p className="text-que-text-main">No reviews yet</p>
            ) : (
              reviews.map((r) => <ReviewItem key={r._id} review={r} />)
            )}
            <ReviewPagination
              pagination={pagination}
              page={page}
              setPage={setPage}
            />
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shipping & Returns</h3>
            <p className="text-que-text-main">
              Free shipping on orders over $100
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;

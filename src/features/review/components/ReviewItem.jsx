import React from "react";
import { FaStar } from "react-icons/fa";
import defaultAvatar from "../../../assets/defaultAvatar.jpg";

const ReviewItem = ({ review }) => {
  if (!review) return null;

  return (
    <div className="border-b border-que-secondary pb-4 mb-4 flex space-x-4">
      {/* Avatar */}
      <img
        src={review.user?.avatar || defaultAvatar}
        alt={review.user?.personalInfo?.fullName || review.user?.email}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-que-text-main">
            {review.user?.personalInfo?.fullName || review.user?.email}
          </h4>
          <div className="flex">
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                className={
                  idx < review.rating ? "text-yellow-400" : "text-que-border"
                }
              />
            ))}
          </div>
        </div>
        <p className="text-que-text-main mt-1">{review.comment}</p>
        <span className="text-sm text-que-text-muted">
          {new Date(review.createdAt).toLocaleDateString("vi-VN")}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;

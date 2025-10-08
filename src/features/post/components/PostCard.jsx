import React from "react";
import { Link } from "react-router-dom";
import gauhai from "../../../assets/gauhai.png";

const PostCard = ({ post }) => {
  const img = post.coverImage || gauhai;

  return (
    <div className="bg-que-surface rounded-lg shadow-md overflow-hidden transform transition duration-150 hover:shadow-2xl hover:scale-105">
      <Link to={`/post/${post.slug}`}>
        <img src={img} alt={post.title} className="h-40 w-full object-cover" />
        <div className="p-3">
          <h3 className="text-sm font-semibold line-clamp-2 text-que-text-main">
            {post.title}
          </h3>
          <p className="text-xs text-que-text-muted mt-1">
            {post.category || "Bài viết"}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-que-text-muted">
              {post.views ?? 0} 👁
            </span>
            <span className="text-xs text-que-text-muted">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;

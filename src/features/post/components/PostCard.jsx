import React from "react";
import { Link } from "react-router-dom";
import gauhai from "../../../assets/gauhai.png";

const PostCard = ({ post, to }) => {
    const img = post.coverImage || gauhai;
    const fallback = post.slug || post._id;
    const finalTo = to ?? `/post/${fallback}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-150 hover:shadow-2xl hover:scale-105">
        <Link to={finalTo}>
            <img src={img} alt={post.title} className="h-40 w-full object-cover" />
            <div className="p-3">
            <h3 className="text-sm font-semibold line-clamp-2 text-black">{post.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{post.category || "Bài viết"}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.views ?? 0} 👁</span>
                <span className="text-xs text-gray-500">
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                </span>
            </div>
            </div>
        </Link>
        </div>
    );
};

export default PostCard;
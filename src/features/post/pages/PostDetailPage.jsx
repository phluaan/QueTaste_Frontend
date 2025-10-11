import React from "react";
import { Link } from "react-router-dom";
import usePostDetail from "../../post/hooks/usePostDetail";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";

const PostDetailPage = () => {
  const { postDetail, loading, error } = usePostDetail();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-que-danger mt-10">❌ {error}</p>;
  if (!postDetail) return null;

  return (
    <div className="min-h-screen bg-que-background">
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-4">
          <Link to="/" className="text-que-accent">
            Home
          </Link>{" "}
          &gt;
          <Link to="/posts" className="text-que-accent ml-2">
            Posts
          </Link>{" "}
          &gt;
          <span className="ml-2 text-que-text-muted">{postDetail.title}</span>
        </div>

        {/* Title + Category */}
        <h1 className="text-3xl font-bold mb-2 text-que-text-main">
          {postDetail.title}
        </h1>
        <p className="text-que-text-muted mb-4">{postDetail.category}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {postDetail.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-que-background text-que-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {postDetail.contentBlocks.map((block, idx) =>
            block.type === "text" ? (
              <p key={idx} className="text-que-text-main leading-relaxed">
                {block.text}
              </p>
            ) : (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={block.image}
                  alt={block.caption || ""}
                  className="rounded mb-2 max-w-full w-3/4"
                />
                {block.caption && (
                  <p className="text-sm text-que-text-muted text-center">
                    {block.caption}
                  </p>
                )}
              </div>
            )
          )}
        </div>

        {/* Author */}
        {postDetail.author && (
          <div className="mt-10 p-4 border-t">
            <p className="text-sm text-que-text-muted mb-2">Tác giả</p>
            <div className="flex items-center gap-4">
              <img
                src={postDetail.author.avatar || "/default-avatar.png"}
                alt={postDetail.author.personalInfo?.fullName || "Author"}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-que-text-main">
                  {postDetail.author.personalInfo?.fullName || "Unknown Author"}
                </p>
                <p className="text-sm text-que-text-muted">
                  {postDetail.author.email || "No email"}
                </p>
                <div className="text-xs text-que-text-muted mt-1">
                  <span>
                    Ngày đăng:{" "}
                    {new Date(postDetail.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mx-2">·</span>
                  <span>Lượt xem: {postDetail.views}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mt-8 p-4 bg-que-background rounded border">
          <h2 className="font-semibold mb-2 text-que-text-main">Bình luận</h2>
          <p className="text-que-text-muted">Chưa có bình luận</p>
        </div>
      </main>
    </div>
  );
};

export default PostDetailPage;

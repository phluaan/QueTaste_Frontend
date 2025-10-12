import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostDetail from "../../../post/hooks/usePostDetail";
import AdminLayout from "../../layouts/AdminLayout";
import { Pencil, Lock, ArrowLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

const AdminPostDetailPage = () => {
    const { postDetail, loading, error } = usePostDetail(); // lấy theo slug
    const navigate = useNavigate();

    const [locking, setLocking] = useState(false);
    const [lockErr, setLockErr] = useState(null);

    const handleLock = useCallback(async () => {
        if (!postDetail?.slug) return;
        const ok = window.confirm("Bạn muốn KHÓA bài viết này? Người dùng sẽ không còn thấy bài viết.");
        if (!ok) return;

        try {
        setLocking(true);
        setLockErr(null);

        await axios.patch(`${API_BASE_URL}/post/${postDetail.slug}/lock`, {
            locked: true,
        });

        navigate("/admin/posts-list");
        } catch (err) {
        setLockErr(err?.response?.data?.message || err.message || "Khóa bài viết thất bại");
        } finally {
        setLocking(false);
        }
    }, [postDetail, navigate]);

    if (loading) {
        return (
        <AdminLayout>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
            Đang tải chi tiết bài viết…
            </div>
        </AdminLayout>
        );
    }

    if (error) {
        return (
        <AdminLayout>
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center text-red-600">
            ❌ {error}
            </div>
        </AdminLayout>
        );
    }

    if (!postDetail) return null;

    return (
        <AdminLayout>
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div>
            <h1 className="text-2xl font-semibold">{postDetail.title}</h1>
            <p className="text-sm text-gray-500">
                {postDetail.category || "Bài viết"} • {new Date(postDetail.createdAt).toLocaleDateString("vi-VN")} •{" "}
                {postDetail.views ?? 0} lượt xem
            </p>
            </div>

            <div className="flex items-center gap-2">
            <Link
                to="/admin/posts-list"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 transition text-sm"
                aria-label="Quay lại danh sách"
            >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
            </Link>

            <Link
                to={`/admin/posts/edit/${postDetail.slug || postDetail._id}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition text-sm"
                aria-label="Sửa bài viết"
            >
                <Pencil className="w-4 h-4" />
                Sửa
            </Link>

            <button
                onClick={handleLock}
                disabled={locking}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition text-sm disabled:opacity-60"
                aria-label="Khóa bài viết"
                title="Khóa bài viết"
            >
                <Lock className="w-4 h-4" />
                {locking ? "Đang khóa…" : "Khóa"}
            </button>
            </div>
        </div>

        {lockErr && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 px-4 py-2 text-sm">
            ❌ {lockErr}
            </div>
        )}

        {Array.isArray(postDetail.tags) && postDetail.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <div className="flex flex-wrap gap-2">
                {postDetail.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    {tag}
                </span>
                ))}
            </div>
            </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
            {(postDetail.contentBlocks || []).map((block, idx) =>
                block.type === "text" ? (
                <p key={idx} className="text-gray-700 leading-relaxed">
                    {block.text}
                </p>
                ) : (
                <div key={idx} className="flex flex-col items-center">
                    <img
                    src={block.image}
                    alt={block.caption || ""}
                    className="rounded mb-2 max-w-full w-full md:w-3/4"
                    />
                    {block.caption && <p className="text-sm text-gray-500 text-center">{block.caption}</p>}
                </div>
                )
            )}
            </div>

            {postDetail.author && (
            <div className="mt-10 p-4 border-t">
                <p className="text-sm text-gray-400 mb-2">Tác giả</p>
                <div className="flex items-center gap-4">
                <img
                    src={postDetail.author.avatar || "/default-avatar.png"}
                    alt={postDetail.author.personalInfo?.fullName || "Author"}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">
                    {postDetail.author.personalInfo?.fullName || "Unknown Author"}
                    </p>
                    <p className="text-sm text-gray-500">{postDetail.author.email || "No email"}</p>
                    <div className="text-xs text-gray-400 mt-1">
                    <span>Ngày đăng: {new Date(postDetail.createdAt).toLocaleDateString("vi-VN")}</span>
                    <span className="mx-2">·</span>
                    <span>Lượt xem: {postDetail.views ?? 0}</span>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </AdminLayout>
    );
};

export default AdminPostDetailPage;
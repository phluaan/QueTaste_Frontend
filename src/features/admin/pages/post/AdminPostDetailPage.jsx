import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePostDetail from "../../../post/hooks/usePostDetail";
import AdminLayout from "../../layouts/AdminLayout";
import { Pencil, Save, X, Lock, Unlock, ArrowLeft, Plus, Trash } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

const arrFromTags = (tags) =>
    Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s) => s.trim()).filter(Boolean) : [];

const AdminPostDetailPage = () => {
    const { postDetail, loading, error } = usePostDetail({ admin: true });
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveErr, setSaveErr] = useState(null);

    const [toggling, setToggling] = useState(false);
    const [toggleErr, setToggleErr] = useState(null);

    // form state
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tagsStr, setTagsStr] = useState(""); // CSV input
    const [blocks, setBlocks] = useState([]);

    // init form when detail ready or when leaving editMode
    useEffect(() => {
        if (!postDetail) return;
        setTitle(postDetail.title || "");
        setCategory(postDetail.category || "");
        setTagsStr(arrFromTags(postDetail.tags).join(", "));
        setBlocks(Array.isArray(postDetail.contentBlocks) ? postDetail.contentBlocks : []);
    }, [postDetail, editMode === false]);

    const isPublished = !!postDetail?.isPublished;

    const handleTogglePublish = useCallback(async () => {
        if (!postDetail?.slug) return;
        const ok = window.confirm(
        isPublished
            ? "Khóa bài viết này? Người dùng sẽ không còn thấy bài viết."
            : "Mở khóa bài viết này? Bài viết sẽ hiển thị với người dùng."
        );
        if (!ok) return;
        try {
        setToggling(true);
        setToggleErr(null);
        await axios.patch(
            `${API_BASE_URL}/statistics/posts/${postDetail.slug}/lock`,
            { locked: isPublished },
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
        );
        navigate("/admin/posts-list");
        } catch (err) {
        setToggleErr(err?.response?.data?.message || err.message || "Thao tác thất bại");
        } finally {
        setToggling(false);
        }
    }, [postDetail, isPublished, navigate]);

    const handleSave = useCallback(async () => {
        if (!postDetail?.slug) return;
        try {
        setSaving(true);
        setSaveErr(null);
        const payload = {
            title: title?.trim(),
            category: category?.trim(),
            tags: arrFromTags(tagsStr),
            contentBlocks: blocks.map((b) => ({
            type: b.type === "image" ? "image" : "text",
            text: b.type === "text" ? (b.text || "").toString() : undefined,
            image: b.type === "image" ? (b.image || "").toString() : undefined,
            caption: b.type === "image" ? (b.caption || "").toString() : undefined,
            })),
        };
        await axios.patch(`${API_BASE_URL}/statistics/posts/${postDetail.slug}`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setEditMode(false);
        // reload lại chi tiết cho chắc (đi về list rồi quay lại cũng được, nhưng thôi refresh tại chỗ)
        window.location.reload();
        } catch (err) {
        setSaveErr(err?.response?.data?.message || err.message || "Lưu thay đổi thất bại");
        } finally {
        setSaving(false);
        }
    }, [postDetail, title, category, tagsStr, blocks]);

    const handleCancel = useCallback(() => {
        // khôi phục lại từ postDetail
        if (!postDetail) return;
        setTitle(postDetail.title || "");
        setCategory(postDetail.category || "");
        setTagsStr(arrFromTags(postDetail.tags).join(", "));
        setBlocks(Array.isArray(postDetail.contentBlocks) ? postDetail.contentBlocks : []);
        setEditMode(false);
        setSaveErr(null);
    }, [postDetail]);

    const addTextBlock = () =>
        setBlocks((prev) => [...prev, { type: "text", text: "" }]);

    const addImageBlock = () =>
        setBlocks((prev) => [...prev, { type: "image", image: "", caption: "" }]);

    const removeBlock = (idx) =>
        setBlocks((prev) => prev.filter((_, i) => i !== idx));

    const moveBlock = (from, to) => {
        setBlocks((prev) => {
        const list = [...prev];
        if (to < 0 || to >= list.length) return prev;
        const [it] = list.splice(from, 1);
        list.splice(to, 0, it);
        return list;
        });
    };

    const headerBadge = useMemo(
        () =>
        isPublished ? (
            <span className="px-2 py-0.5 text-xs rounded bg-emerald-100 text-emerald-700">Đang hiển thị</span>
        ) : (
            <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-700">Đang khóa</span>
        ),
        [isPublished]
    );

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
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center text-red-600">❌ {error}</div>
        </AdminLayout>
        );
    }

    if (!postDetail) return null;

    return (
        <AdminLayout>
        <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
            <div className="flex items-center gap-2">
                {editMode ? (
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-semibold w-full max-w-3xl border-b border-gray-300 focus:border-indigo-400 outline-none bg-transparent"
                    placeholder="Tiêu đề bài viết"
                />
                ) : (
                <h1 className="text-2xl font-semibold truncate">{postDetail.title}</h1>
                )}
                {headerBadge}
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                {editMode ? (
                <>
                    <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-200"
                    placeholder="Danh mục"
                    />
                    <span>•</span>
                    <span>{postDetail.createdAt ? new Date(postDetail.createdAt).toLocaleDateString("vi-VN") : "—"}</span>
                    <span>•</span>
                    <span>{postDetail.views ?? 0} lượt xem</span>
                </>
                ) : (
                <>
                    <span>{postDetail.category || "Bài viết"}</span>
                    <span>•</span>
                    <span>{postDetail.createdAt ? new Date(postDetail.createdAt).toLocaleDateString("vi-VN") : "—"}</span>
                    <span>•</span>
                    <span>{postDetail.views ?? 0} lượt xem</span>
                </>
                )}
            </div>
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

            {!editMode ? (
                <button
                onClick={() => setEditMode(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition text-sm"
                aria-label="Sửa tại chỗ"
                title="Sửa tại chỗ"
                >
                <Pencil className="w-4 h-4" />
                Sửa
                </button>
            ) : (
                <>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition text-sm disabled:opacity-60"
                    aria-label="Lưu thay đổi"
                    title="Lưu thay đổi"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Đang lưu…" : "Lưu"}
                </button>
                <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm disabled:opacity-60"
                    aria-label="Hủy"
                    title="Hủy"
                >
                    <X className="w-4 h-4" />
                    Hủy
                </button>
                </>
            )}

            <button
                onClick={handleTogglePublish}
                disabled={toggling}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white transition text-sm disabled:opacity-60 ${
                isPublished ? "bg-amber-600 hover:bg-amber-500" : "bg-emerald-600 hover:bg-emerald-500"
                }`}
                aria-label={isPublished ? "Khóa bài viết" : "Mở khóa bài viết"}
                title={isPublished ? "Khóa bài viết" : "Mở khóa bài viết"}
            >
                {isPublished ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                {toggling ? "Đang xử lý…" : isPublished ? "Khóa" : "Mở khóa"}
            </button>
            </div>
        </div>

        {toggleErr && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 px-4 py-2 text-sm">❌ {toggleErr}</div>
        )}
        {saveErr && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">❌ {saveErr}</div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Tags */}
            <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Thẻ</p>
            {editMode ? (
                <input
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-200"
                placeholder="Ví dụ: quà tết, mứt dừa, miền tây"
                />
            ) : Array.isArray(postDetail.tags) && postDetail.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                {postDetail.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    {tag}
                    </span>
                ))}
                </div>
            ) : (
                <span className="text-sm text-gray-400">—</span>
            )}
            </div>

            {/* Content blocks */}
            <div className="space-y-6">
            {blocks.map((block, idx) =>
                editMode ? (
                <div key={idx} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-gray-500 uppercase">
                        {block.type === "image" ? "Khối ảnh" : "Khối văn bản"}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                        type="button"
                        onClick={() => moveBlock(idx, idx - 1)}
                        className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                        >
                        ↑
                        </button>
                        <button
                        type="button"
                        onClick={() => moveBlock(idx, idx + 1)}
                        className="px-2 py-1 text-xs rounded border hover:bg-gray-50"
                        >
                        ↓
                        </button>
                        <button
                        type="button"
                        onClick={() => removeBlock(idx)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50"
                        >
                        <Trash className="w-3 h-3" />
                        Xóa
                        </button>
                    </div>
                    </div>

                    {block.type === "text" ? (
                    <textarea
                        value={block.text || ""}
                        onChange={(e) =>
                        setBlocks((prev) =>
                            prev.map((b, i) => (i === idx ? { ...b, text: e.target.value } : b))
                        )
                        }
                        rows={4}
                        className="w-full px-3 py-2 rounded border border-gray-200"
                        placeholder="Nhập nội dung văn bản…"
                    />
                    ) : (
                    <div className="space-y-2">
                        <input
                        value={block.image || ""}
                        onChange={(e) =>
                            setBlocks((prev) =>
                            prev.map((b, i) => (i === idx ? { ...b, image: e.target.value } : b))
                            )
                        }
                        className="w-full px-3 py-2 rounded border border-gray-200"
                        placeholder="URL ảnh"
                        />
                        <input
                        value={block.caption || ""}
                        onChange={(e) =>
                            setBlocks((prev) =>
                            prev.map((b, i) => (i === idx ? { ...b, caption: e.target.value } : b))
                            )
                        }
                        className="w-full px-3 py-2 rounded border border-gray-200"
                        placeholder="Chú thích"
                        />
                    </div>
                    )}
                </div>
                ) : block.type === "text" ? (
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
                    {block.caption && (
                    <p className="text-sm text-gray-500 text-center">{block.caption}</p>
                    )}
                </div>
                )
            )}
            </div>

            {editMode && (
            <div className="mt-4 flex flex-wrap gap-2">
                <button
                type="button"
                onClick={addTextBlock}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                >
                <Plus className="w-4 h-4" />
                Thêm khối văn bản
                </button>
                <button
                type="button"
                onClick={addImageBlock}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                >
                <Plus className="w-4 h-4" />
                Thêm khối ảnh
                </button>
            </div>
            )}
        </div>
        </AdminLayout>
    );
};

export default AdminPostDetailPage;
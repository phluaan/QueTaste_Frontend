import { Link } from "react-router-dom";
import CouponCard from "../../../coupon/components/CouponCard";
import useCoupon from "../../../coupon/hooks/useCoupon";
import CouponLayout from "../../../coupon/layouts/CouponLayout";

const CouponListPage = () => {
    const { coupons, loading, totalPage, currentPage, setPage } = useCoupon();

    return (
        <CouponLayout>
        {/* Header với nút thêm */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Quản lý Coupon</h1>
            <Link to="/admin/coupon/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Thêm Coupon
            </Link>
        </div>

        {loading.list ? (
            <p>Đang tải...</p>
        ) : coupons.length ? (
            <>
            {/* Grid danh sách coupon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coupons.map((c) => (
                <CouponCard key={c._id} c={c} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 mb-6 gap-2 items-center">
                {/* Nút Previous */}
                <button
                onClick={() => setPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border 
                    ${
                    currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#FF7E67] hover:text-white"
                    } 
                    border-[#A2D5F2] bg-[#FAFAFA]`}
                >
                &lt;
                </button>

                {/* Trang 1 */}
                <button
                onClick={() => setPage(1)}
                className={`px-3 py-1 rounded border 
                    ${
                    currentPage === 1
                        ? "bg-[#07689F] text-white"
                        : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"
                    } 
                    border-[#A2D5F2]`}
                >
                1
                </button>

                {/* Dấu ... nếu đang ở trang > 3 */}
                {currentPage > 3 && <span className="px-2">...</span>}

                {/* Các trang lân cận */}
                {Array.from({ length: totalPage }, (_, i) => i + 1)
                .filter(
                    (page) =>
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1
                )
                .map(
                    (page) =>
                    page !== 1 &&
                    page !== totalPage && (
                        <button
                        key={page}
                        onClick={() => setPage(page)}
                        className={`px-3 py-1 rounded border 
                            ${
                            currentPage === page
                                ? "bg-[#07689F] text-white"
                                : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"
                            } 
                            border-[#A2D5F2]`}
                        >
                        {page}
                        </button>
                    )
                )}

                {/* Dấu ... nếu còn trang ẩn trước trang cuối */}
                {currentPage < totalPage - 2 && <span className="px-2">...</span>}

                {/* Trang cuối */}
                {totalPage > 1 && (
                <button
                    onClick={() => setPage(totalPage)}
                    className={`px-3 py-1 rounded border 
                    ${
                        currentPage === totalPage
                        ? "bg-[#07689F] text-white"
                        : "bg-[#FAFAFA] hover:bg-[#FF7E67] hover:text-white"
                    } 
                    border-[#A2D5F2]`}
                >
                    {totalPage}
                </button>
                )}

                {/* Nút Next */}
                <button
                onClick={() => setPage(Math.min(currentPage + 1, totalPage))}
                disabled={currentPage === totalPage}
                className={`px-3 py-1 rounded border 
                    ${
                    currentPage === totalPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#FF7E67] hover:text-white"
                    } 
                    border-[#A2D5F2] bg-[#FAFAFA]`}
                >
                &gt;
                </button>
            </div>
            </>
        ) : (
            <p>Không có coupon nào.</p>
        )}
        </CouponLayout>
    );
};

export default CouponListPage;
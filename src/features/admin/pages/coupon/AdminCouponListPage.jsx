import { Link } from "react-router-dom";
import CouponCard from "../../../coupon/components/CouponCard";
import useCoupon from "../../../coupon/hooks/useCoupon";
import CouponLayout from "../../../coupon/layouts/CouponLayout";
import Pagination from "../../../coupon/components/Pagination";
import { useSelector } from "react-redux";

const CouponListPage = () => {
  const token = useSelector((s) => s.auth.accessToken);
  const { coupons, loading, totalPage, currentPage, setPage } = useCoupon({
    role: "admin",
    token,
  });

  return (
    <>
      {/* Header với nút thêm */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Quản lý Coupon</h1>
        <Link
          to="/admin/coupon/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
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
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            setPage={setPage}
          />
        </>
      ) : (
        <p>Không có coupon nào.</p>
      )}
    </>
  );
};

export default CouponListPage;

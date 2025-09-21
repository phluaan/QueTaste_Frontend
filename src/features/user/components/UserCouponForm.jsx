import { useState } from "react";
import { Tabs, Spin, Button } from "antd";
import { useSelector } from "react-redux";
import CouponCard from "../../coupon/components/CouponCard";
import Pagination from "../../coupon/components/Pagination";
import { showSuccess, showError } from "../../../utils/toastUtils";
import useCoupon from "../../coupon/hooks/useCoupon";
import CouponDetailModal from "../../coupon/components/CouponDetailModal";

const UserCouponForm = () => {
    const token = useSelector((s) => s.auth.accessToken);

    const {
        loading,
        publicCouponsPage, publicTotalPage, publicPage, setPublicPage,
        privateCouponsPage, privateTotalPage, privatePage, setPrivatePage,
        myCouponsPage, myTotalPage, myPage, setMyPage,
        loadingMy, redeemCoupon, fetchMyCoupons,
    } = useCoupon({ role: "user", token, filterStatus: "active", limit: 9 });

    const [selectedCouponId, setSelectedCouponId] = useState(null);

    const handleRedeem = async (id) => {
        try {
        const res = await redeemCoupon(id);
        if (res.success) {
            showSuccess("Đổi coupon thành công!");
            fetchMyCoupons();
        } else {
            showError(res.message);
        }
        } catch (err) {
        showError(err.response?.data?.message || "Đổi coupon thất bại");
        }
    };

    return (
        <>
        <Tabs defaultActiveKey="public">
            {/* TAB PUBLIC */}
            <Tabs.TabPane tab="Coupon Public" key="public">
            {loading.list ? (
                <Spin />
            ) : (
                <>
                <div className="grid grid-cols-3 gap-4">
                    {publicCouponsPage.map((c) => (
                    <CouponCard
                        key={c._id}
                        c={c}
                        disableLink
                        onClick={() => setSelectedCouponId(c._id)}
                    />
                    ))}
                </div>
                <Pagination
                    currentPage={publicPage}
                    totalPage={publicTotalPage}
                    setPage={setPublicPage}
                />
                </>
            )}
            </Tabs.TabPane>

            {/* TAB PRIVATE */}
            <Tabs.TabPane tab="Coupon Private" key="private">
            {loading.list ? (
                <Spin />
            ) : (
                <>
                <div className="grid grid-cols-3 gap-4">
                    {privateCouponsPage.map((c) => (
                    <div key={c._id} className="relative">
                        <CouponCard
                        c={c}
                        disableLink
                        onClick={() => setSelectedCouponId(c._id)}
                        />
                        <Button
                        type="primary"
                        className="mt-2"
                        onClick={(e) => {
                            e.stopPropagation(); // chặn mở modal khi bấm nút
                            handleRedeem(c._id);
                        }}
                        >
                        Đổi bằng {c.redeemCost} điểm
                        </Button>
                    </div>
                    ))}
                </div>
                <Pagination
                    currentPage={privatePage}
                    totalPage={privateTotalPage}
                    setPage={setPrivatePage}
                />
                </>
            )}
            </Tabs.TabPane>

            {/* TAB MY COUPONS */}
            <Tabs.TabPane tab="Coupon đã đổi" key="my">
            {loadingMy ? (
                <Spin />
            ) : (
                <>
                <div className="grid grid-cols-3 gap-4">
                    {myCouponsPage.map((uc) => (
                    <CouponCard
                        key={uc.id}
                        c={uc.coupon}
                        disableLink
                        onClick={() => setSelectedCouponId(uc.coupon.id)}
                    />
                    ))}
                </div>
                <Pagination
                    currentPage={myPage}
                    totalPage={myTotalPage}
                    setPage={setMyPage}
                />
                </>
            )}
            </Tabs.TabPane>
        </Tabs>

        {/* Modal chi tiết coupon */}
        <CouponDetailModal
            open={!!selectedCouponId}
            onClose={() => setSelectedCouponId(null)}
            couponId={selectedCouponId}
        />
        </>
    );
};

export default UserCouponForm;
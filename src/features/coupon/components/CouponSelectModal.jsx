import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import useCoupon from "../../coupon/hooks/useCoupon";
import CouponCard from "../../coupon/components/CouponCard";

const CouponSelectModal = ({ open, onClose, onSelect }) => {
  const token = useSelector((s) => s.auth.accessToken);

  const {
    publicCouponsPage,
    loading,
    myCouponsPage, // 👈 từ fetchMyCoupons
    loadingMy,
  } = useCoupon({
    role: "user",
    token,
    filterStatus: "active",
    limit: 20,
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
      destroyOnClose
    >
      {loading.list ? (
        <div className="flex justify-center p-10">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: PUBLIC */}
          <div className="border rounded-lg p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-3">🌍 Coupon sẵn có</h2>
            <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
              {publicCouponsPage.map((c) => (
                <div
                  key={c._id}
                  onClick={() => {
                    onSelect(c);
                    onClose();
                  }}
                  className="cursor-pointer hover:scale-[1.02] transition"
                >
                  <CouponCard c={c} disableLink />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRIVATE (đã đổi) */}
          <div className="border rounded-lg p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-3">🔒 Coupon Đã đổi</h2>
            <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
              {loadingMy ? (
                <Spin />
              ) : myCouponsPage.length > 0 ? (
                myCouponsPage.map((uc) => {
                  const c = uc.coupon; // vì API /my trả { id, coupon: {...} }
                  if (!c) return null;
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelect(c);
                        onClose();
                      }}
                      className="cursor-pointer hover:scale-[1.02] transition"
                    >
                      <CouponCard c={c} disableLink />
                    </div>
                  );
                })
              ) : (
                <p className="text-que-text-muted text-sm">
                  Bạn chưa đổi coupon nào.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CouponSelectModal;

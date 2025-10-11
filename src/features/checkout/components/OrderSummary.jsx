import { useState } from "react";
import CouponSelectModal from "../../coupon/components/CouponSelectModal";

const OrderSummary = ({ subtotal, shippingFee, discount, onApplyCoupon }) => {
  const finalAmount = subtotal - discount + shippingFee;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleSelect = (coupon) => {
    setSelectedCoupon(coupon);
    onApplyCoupon(coupon); // callback báo cho CheckoutPage biết để tính discount
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-que-primary">Order Summary</h3>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString()}₫</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{shippingFee.toLocaleString()}₫</span>
        </div>

        {/* Coupon */}
        <div className="flex justify-between items-start">
          <span>Coupon</span>
          {selectedCoupon ? (
            <div className="text-right">
              <p className="font-medium text-que-primary">
                {selectedCoupon.name}
              </p>
              <p className="text-sm text-gray-500">
                {selectedCoupon.description}
              </p>
              <button
                onClick={() => {
                  setSelectedCoupon(null);
                  onApplyCoupon(null);
                }}
                className="text-xs text-red-500 hover:text-red-600 underline"
              >
                Bỏ chọn
              </button>
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="text-que-primary underline hover:text-que-accent"
            >
              Chọn phiếu giảm giá
            </button>
          )}
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-{discount.toLocaleString()}₫</span>
        </div>

        {/* Total */}
        <div className="border-t pt-4 flex justify-between font-bold text-xl">
          <span>Total</span>
          <span className="text-que-secondary">
            {finalAmount.toLocaleString()}₫
          </span>
        </div>
      </div>

      {/* Modal chọn coupon */}
      <CouponSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OrderSummary;

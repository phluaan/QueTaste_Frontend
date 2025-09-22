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
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
            <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>{shippingFee.toLocaleString()}₫</span>
            </div>

            {/* Phiếu giảm giá */}
            <div className="flex justify-between items-center">
            <span>Coupon</span>
            {selectedCoupon ? (
                <div className="text-right">
                <p className="font-medium">{selectedCoupon.name}</p>
                <p className="text-sm text-gray-500">
                    {selectedCoupon.description}
                </p>
                <button
                    onClick={() => {
                        setSelectedCoupon(null);
                        onApplyCoupon(null);
                    }}
                    className="text-xs text-red-500 underline"
                    >
                    Bỏ chọn
                </button>
                </div>
            ) : (
                <button
                onClick={() => setModalOpen(true)}
                className="text-blue-600 underline"
                >
                Chọn phiếu giảm giá
                </button>
            )}
            </div>

            <div className="flex justify-between">
            <span>Discount</span>
            <span>-{discount.toLocaleString()}₫</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{finalAmount.toLocaleString()}₫</span>
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
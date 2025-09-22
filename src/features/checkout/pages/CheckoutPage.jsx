import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import useCheckout from "../hooks/useCheckout";
import { useState } from "react";

// Hàm tính discount an toàn
const calcCouponDiscount = (coupon, subtotal, shippingFee) => {
    if (!coupon) return 0;

    const value = Number(coupon.value) || 0;
    const maxDiscount = Number(coupon.maxDiscount || Infinity);

    if (coupon.type === "percentage") {
        return Math.min((subtotal * value) / 100, maxDiscount);
    }

    if (coupon.type === "fixed") {
        return Math.min(value, subtotal);
    }

    if (coupon.type === "free_shipping") {
        const cap = value > 0 ? Math.min(value, shippingFee) : shippingFee;
        return Math.min(cap, maxDiscount);
    }

    return 0;
};

const CheckoutPage = () => {
    const { items } = useSelector((state) => state.cart);
    const { handleCheckout, loading } = useCheckout();
    const navigate = useNavigate();

    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const subtotal = items.reduce(
        (total, item) =>
        total +
        (item.product.salePrice || item.product.price) * item.quantity,
        0
    );
    const shippingFee = 36000;

    const discount = calcCouponDiscount(selectedCoupon, subtotal, shippingFee);

    const onSubmit = async (data) => {
        try {
        const result = await handleCheckout({
            ...data,
            items,
            coupon: selectedCoupon?._id || null,
        });

        if (data.paymentMethod === "momo") {
            if (result?.payUrl) {
            window.location.href = result.payUrl;
            } else {
            console.error("MoMo payUrl not found");
            }
        } else {
            navigate("/products");
        }
        } catch (err) {
        console.error("Checkout failed:", err);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAFAFA]">
        <Header />
        <div className="container mx-auto px-16 py-12 mt-20 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
            <CheckoutForm onSubmit={onSubmit} />
            </div>
            <div className="lg:w-1/3 space-y-4">
            <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discount}
                selectedCoupon={selectedCoupon}
                onApplyCoupon={(c) => setSelectedCoupon(c)}
                onClearCoupon={() => setSelectedCoupon(null)}
            />
            {loading && <p className="text-center mt-4">Processing order...</p>}
            </div>
        </div>
        <Footer />
        </main>
    );
};

export default CheckoutPage;
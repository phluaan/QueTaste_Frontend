import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import useCheckout from "../hooks/useCheckout";

const CheckoutPage = () => {
    const { items } = useSelector((state) => state.cart);
    const { handleCheckout, loading } = useCheckout();
    const navigate = useNavigate();

    const subtotal = items.reduce(
        (total, item) =>
        total +
        (item.product.salePrice || item.product.price) * item.quantity,
        0
    );
    const shippingFee = 36000;
    const discount = 0;

    const onSubmit = async (data) => {
        try {
        const result = await handleCheckout({ ...data, items });

        if (data.paymentMethod === "momo") {
            if (result?.payUrl) {
            // ✅ chuyển hướng sang MoMo sandbox
            window.location.href = result.payUrl;
            } else {
            console.error("MoMo payUrl not found");
            }
        } else {
            // ✅ COD: điều hướng luôn
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
            <div className="lg:w-1/3">
            <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discount}
            />
            {loading && <p className="text-center mt-4">Processing order...</p>}
            </div>
        </div>
        <Footer />
        </main>
    );
};

export default CheckoutPage;
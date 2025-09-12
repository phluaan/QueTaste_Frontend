import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axiosClient";
import { showSuccess, showError } from "../../../utils/toastUtils";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";

const PaymentResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const resultCode = queryParams.get("resultCode");
    const orderId = queryParams.get("orderId");

    useEffect(() => {
        const updateStatus = async () => {
        if (orderId && resultCode !== null) {
            try {
                const orderId = queryParams.get("orderId");
                await axiosClient.post("/order/update-status", { orderId, resultCode });
                if (resultCode === "0") {
                    showSuccess("Thanh toán MoMo thành công 🎉");
                } else {
                    showError("Thanh toán thất bại hoặc bị hủy ❌");
                }
            } catch (err) {
                showError("Không cập nhật được trạng thái đơn hàng ❌");
            }
        }
        };

        updateStatus();

        // sau vài giây tự quay về products
        const timer = setTimeout(() => {
        navigate("/products");
        }, 3000);

        return () => clearTimeout(timer);
    }, [orderId, resultCode, navigate]);

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
            {resultCode === "0" ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Thanh toán thành công 🎉</h2>
                <p>Mã đơn hàng: {orderId}</p>
                <p>Bạn sẽ được chuyển về trang sản phẩm trong giây lát...</p>
            </div>
            ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Thanh toán thất bại ❌</h2>
                <p>Mã đơn hàng: {orderId}</p>
                <p>Bạn sẽ được chuyển về trang sản phẩm trong giây lát...</p>
            </div>
            )}
        </div>
        <Footer />
        </main>
    );
};

export default PaymentResultPage;
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axiosClient";
import { showSuccess, showError } from "../../../utils/toastUtils";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import { clearCart } from "../../cart/slices/cartSlice";

const PaymentResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const resultCode = queryParams.get("resultCode");
  const orderId = queryParams.get("orderId");

  // 🟢 flag để đảm bảo chỉ gọi 1 lần
  const hasUpdated = useRef(false);

  useEffect(() => {
    const updateStatus = async () => {
      if (hasUpdated.current) return; // nếu đã gọi rồi thì thoát
      hasUpdated.current = true;

      if (orderId && resultCode !== null) {
        try {
          console.log("🚀 update-status request:", { orderId, resultCode });

          const res = await axiosClient.post("/order/update-status", {
            orderId,
            resultCode: Number(resultCode),
          });

          console.log("✅ update-status response:", res);

          if (resultCode === "0") {
            showSuccess("Thanh toán MoMo thành công 🎉");
            dispatch(clearCart());
          } else {
            showError("Thanh toán thất bại hoặc bị hủy ❌");
          }
        } catch (err) {
          console.error("❌ update-status error:", err);
          showError("Không cập nhật được trạng thái đơn hàng ❌");
        }
      }
    };

    updateStatus();

    // tự quay về products sau 3s
    const timer = setTimeout(() => {
      navigate("/products");
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderId, resultCode, navigate, dispatch]);

  return (
    <main className="min-h-screen bg-que-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        {resultCode === "0" ? (
          <div className="bg-que-surface p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-que-text-main">
              Thanh toán thành công 🎉
            </h2>
            <p className="text-que-text-muted">Mã đơn hàng: {orderId}</p>
            <p className="text-que-text-muted">
              Bạn sẽ được chuyển về trang sản phẩm trong giây lát...
            </p>
          </div>
        ) : (
          <div className="bg-que-surface p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-que-danger">
              Thanh toán thất bại ❌
            </h2>
            <p className="text-que-text-muted">Mã đơn hàng: {orderId}</p>
            <p className="text-que-text-muted">
              Bạn sẽ được chuyển về trang sản phẩm trong giây lát...
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default PaymentResultPage;

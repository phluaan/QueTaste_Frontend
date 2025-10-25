import { useParams, useNavigate } from "react-router-dom";
import { useOrderTracking } from "../hooks/useOrderTracking";
import { ArrowLeft, Truck, CheckCircle, XCircle } from "lucide-react";

export default function OrderTrackingPage() {
  const { id } = useParams(); // Lấy orderId từ URL
  const navigate = useNavigate();

  const { order, loading, error } = useOrderTracking(id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Đang tải dữ liệu theo dõi đơn hàng...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p>Không thể tải thông tin đơn hàng.</p>
        <p className="text-sm">{error.message || String(error)}</p>
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Không có dữ liệu theo dõi.
      </div>
    );

  // Dữ liệu từ backend
  const {
    orderId,
    status,
    shippingAddress,
    createdAt,
    updatedAt,
    distanceKm,
    estimateMinutes,
    estimatedDeliveryTime,
  } = order;

  // Hiển thị label thân thiện
  const statusLabel = {
    new: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang vận chuyển",
    done_shipping: "Đã giao cho khách",
    completed: "Hoàn tất đơn hàng",
    cancelled: "Đã hủy",
    cancel_requested: "Khách yêu cầu hủy",
    shipper_cancel_requested: "Shipper yêu cầu hủy",
    refund: "Hoàn trả / hoàn tiền",
  }[status];

  // Tiến trình mô phỏng theo trạng thái
  const statusProgressMap = {
    new: 10,
    confirmed: 30,
    shipping: 60,
    done_shipping: 85,
    completed: 100,
    cancelled: 100,
  };
  const progress = statusProgressMap[status] || 0;

  const formatTime = (iso) =>
    new Date(iso).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* Nút quay lại */}
      <div className="flex items-center w-full max-w-2xl mb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Quay lại
        </button>
      </div>

      {/* Khung nội dung */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-bold mb-3">
          🚚 Theo dõi đơn hàng #{orderId}
        </h1>

        <p className="text-gray-700">
          <span className="font-medium">Trạng thái:</span>{" "}
          <span className="text-blue-600 font-semibold">{statusLabel}</span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Ngày đặt:</span> {formatTime(createdAt)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Cập nhật gần nhất:</span>{" "}
          {formatTime(updatedAt)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Địa chỉ giao:</span>{" "}
          {shippingAddress?.address}, {shippingAddress?.city}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Khoảng cách:</span> {distanceKm} km (ước
          tính)
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Thời gian giao dự kiến:</span>{" "}
          {formatTime(estimatedDeliveryTime)}{" "}
          <span className="text-gray-500 text-sm">
            (~ {estimateMinutes} phút)
          </span>
        </p>

        {/* Thanh tiến trình */}
        <div className="w-full bg-gray-200 rounded-full h-3 my-4">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              status === "cancelled" ? "bg-red-400" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mô tả trạng thái */}
        <div className="flex items-center space-x-3 text-gray-600 mt-2">
          {status === "completed" ? (
            <CheckCircle className="text-green-500 w-6 h-6" />
          ) : status.includes("cancel") ? (
            <XCircle className="text-red-500 w-6 h-6" />
          ) : (
            <Truck className="text-blue-500 w-6 h-6" />
          )}
          <span>
            {status === "completed"
              ? "Đơn hàng đã được giao thành công."
              : status === "cancelled"
              ? "Đơn hàng đã bị hủy."
              : "Đơn hàng đang được xử lý hoặc vận chuyển..."}
          </span>
        </div>
      </div>
    </div>
  );
}

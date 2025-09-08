import { useState } from "react";
import gauhai from "../../../assets/gauhai.png";

const OrderItem = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg mb-3 shadow-sm bg-white">
      {/* Header: Shop + trạng thái */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            Yêu thích
          </span>
          <h2 className="font-semibold">Đơn hàng #{order.id}</h2>

        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-500">{order.stage}</span>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              order.status === "completed"
                ? "bg-green-100 text-green-600"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {order.statusLabel}
          </span>
        </div>
      </div>

      {/* Sản phẩm đầu tiên (preview) */}
      <div className="flex justify-between items-start px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={gauhai}
            alt={order.products[0].name}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <div>
            <p className="text-gray-600">{order.products[0].name}</p>
          </div>
        </div>

        {/* Bên phải */}
        <div className="text-right flex flex-col gap-2">
          <div className="text-lg font-bold text-blue-600">
            {order.total.toLocaleString()}₫
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {isExpanded ? "Ẩn chi tiết" : "Xem chi tiết"}
          </button>
        </div>
      </div>

      {/* Chi tiết sản phẩm xổ xuống */}
      {isExpanded && (
        <div className="px-4 pb-3 border-t space-y-3">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b pb-2 last:border-none"
            >
              <img
                src={gauhai}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md border"
              />
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-gray-500 text-sm">
                  SL: {product.quantity} × {product.price.toLocaleString()}₫
                </p>
              </div>
              <p className="font-semibold">
                {(product.quantity * product.price).toLocaleString()}₫
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer: tổng tiền + hành động + voucher */}
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-start border-t">
        {/* Bên trái: Voucher */}
        <div className="text-sm text-gray-600 flex flex-col gap-1">
          {order.voucher ? (
            <>
              <p className="font-medium">Voucher áp dụng:</p>
              <p className="text-green-600">-{order.voucher.discount.toLocaleString()}₫ ({order.voucher.code})</p>
            </>
          ) : (
            <p className="italic text-gray-400">Không có voucher</p>
          )}
        </div>

        {/* Bên phải: Tổng tiền + nút hành động */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg">
            Thành tiền:{" "}
            <span className="text-red-600 font-bold">
              {order.total.toLocaleString()}₫
            </span>
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded text-sm hover:bg-gray-100">
              Yêu cầu trả hàng/Hoàn tiền
            </button>
            <button className="px-4 py-2 border rounded text-sm hover:bg-gray-100">
              Liên hệ người bán
            </button>
            <button className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600">
              Đã nhận hàng
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderItem;

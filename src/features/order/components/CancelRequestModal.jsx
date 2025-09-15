import { useState } from "react";
import useCancelOrder from "../hooks/useCancelOrder";

const CancelRequestModal = ({ open, onClose, order, onSubmit }) => {
  const [reason, setReason] = useState("");

  if (!open) return null;

  const suggestions = [
    "Đổi ý, không muốn mua nữa",
    "Tìm được giá rẻ hơn",
    "Thời gian giao hàng quá lâu",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Lý do hủy đơn hàng</h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do hủy đơn..."
          className="w-full border rounded p-2 mb-3 text-sm"
          rows={3}
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setReason(s)}
              className="px-3 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (reason.trim()) {
                onSubmit(reason);
                setReason("");
              }
            }}
            className="px-4 py-2 rounded text-sm bg-orange-500 text-white hover:bg-orange-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRequestModal;

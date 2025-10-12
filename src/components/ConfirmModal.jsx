import React from "react";

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

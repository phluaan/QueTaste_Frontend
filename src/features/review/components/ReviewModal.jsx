import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Star } from "lucide-react";
import useReview from "../hooks/useReview";

export default function ReviewModal({ open, onClose, product, orderId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const { submitReview, loading } = useReview();

  if (!product) return null;

  const handleSubmit = () => {
    submitReview({ productId: product._id, orderId, rating, comment })
      .then(() => {
        onClose();
        setRating(0);
        setComment("");
      })
      .catch((err) => console.error("Lỗi khi gửi review:", err));
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Đánh giá sản phẩm
            </Dialog.Title>

            {/* Sản phẩm */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={product.images?.[0] || "/no-image.png"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded border"
              />
              <p className="font-medium">{product.name}</p>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer ${
                    (hover || rating) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4 focus:ring focus:ring-blue-200"
              rows={3}
              placeholder="Nhập nhận xét của bạn..."
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={rating === 0}
              >
                Gửi
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

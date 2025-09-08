import { FaMinus, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItem = ({ item, handleUpdate, handleRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <button
        onClick={() => handleRemove(item.product._id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-[#FF7E67]"
      >
        <FaTimes />
      </button>
      <div className="flex gap-6">
        <Link to={`/product/${item.product._id}`}>
          <img
            src={item.product.images?.[0]}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded-md cursor-pointer"
          />
        </Link>
        <div className="flex-1">
          <Link to={`/product/${item.product._id}`}>
            <h3 className="font-bold text-lg cursor-pointer hover:underline text-black">
              {item.product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>
          <div className="mt-2 flex items-center gap-2">
            {item.product.stock >= item.quantity ? (
              <span className="text-green-500 flex items-center gap-1">
                <FaCheck /> In stock ({item.product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 flex items-center gap-1">
                <FaTimes /> Out of stock ({item.product.stock} available)
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdate(item.product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-2 rounded-full bg-[#A2D5F2] hover:bg-[#07689F] text-white disabled:opacity-50"
              >
                <FaMinus size={12} />
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => handleUpdate(item.product._id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
                className="p-2 rounded-full bg-[#A2D5F2] hover:bg-[#07689F] text-white disabled:opacity-50"
              >
                <FaPlus size={12} />
              </button>
            </div>
            {/* Price */}
            <div className="text-right">
              {item.product.salePrice ? (
                <div>
                  <span className="text-gray-400 line-through">
                    {item.product.price.toLocaleString()}₫
                  </span>
                  <div className="text-[#FF7E67] font-bold">
                    {item.product.salePrice.toLocaleString()}₫
                  </div>
                </div>
              ) : (
                <div className="font-bold">{item.product.price.toLocaleString()}₫</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

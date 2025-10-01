import { FaMinus, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItem = ({ item, handleUpdate, handleRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Remove button */}
      <button
        onClick={() => handleRemove(item.product._id)}
        className="absolute top-4 right-4 text-gray-400 hover:text-que-danger"
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
          {/* Tên sản phẩm */}
          <Link to={`/product/${item.product._id}`}>
            <h3 className="font-bold text-lg cursor-pointer hover:underline text-que-primary">
              {item.product.name}
            </h3>
          </Link>
          <p className="text-que-text-muted text-sm mt-1">
            {item.product.description}
          </p>

          {/* Stock status */}
          <div className="mt-2 flex items-center gap-2">
            {item.product.stock >= item.quantity ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaCheck /> Còn hàng ({item.product.stock} sản phẩm)
              </span>
            ) : (
              <span className="text-que-danger flex items-center gap-1">
                <FaTimes /> Hết hàng ({item.product.stock} sản phẩm)
              </span>
            )}
          </div>

          {/* Quantity + Price */}
          <div className="mt-4 flex items-center justify-between">
            {/* Quantity control */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  handleUpdate(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="p-2 rounded-full bg-que-secondary hover:bg-que-primary text-white disabled:opacity-50"
              >
                <FaMinus size={12} />
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() =>
                  handleUpdate(item.product._id, item.quantity + 1)
                }
                disabled={item.quantity >= item.product.stock}
                className="p-2 rounded-full bg-que-secondary hover:bg-que-primary text-white disabled:opacity-50"
              >
                <FaPlus size={12} />
              </button>
            </div>

            {/* Price display */}
            <div className="text-right">
              {item.product.salePrice ? (
                <div>
                  <span className="text-gray-400 line-through">
                    {item.product.price.toLocaleString()}₫
                  </span>
                  <div className="text-que-accent font-bold">
                    {item.product.salePrice.toLocaleString()}₫
                  </div>
                </div>
              ) : (
                <div className="font-bold text-que-primary">
                  {item.product.price.toLocaleString()}₫
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

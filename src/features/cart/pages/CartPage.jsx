import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";

const CartPage = () => {
  const { items, loading, handleUpdate, handleRemove } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <div className="container mx-auto px-16 py-12 mt-20">
        {loading ? (
          <p className="text-center text-lg">Đang tải...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <FaShoppingCart className="text-gray-300 text-8xl mb-6" />
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong giỏ.</p>
            <Link
              to="/products"
              className="bg-[#07689F] hover:bg-[#FF7E67] hover:text-white text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.product._id}
                    item={item}
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{delivery.toLocaleString()}₫</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl">Total</span>
                      <span className="font-bold text-xl">{total.toLocaleString()}₫</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-6 w-full bg-[#07689F] hover:bg-[#FF7E67] text-white py-4 rounded-lg font-bold text-lg transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;

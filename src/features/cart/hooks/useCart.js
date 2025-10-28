import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, addToCart, updateCart, removeFromCart } from "../slices/cartSlice";
import { showError } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAdd = (productId, quantity = 1) => {
    dispatch(addToCart({ productId, quantity }));
  };

  const handleUpdate = (productId, quantity) => {
    dispatch(updateCart({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      showError("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
      return;
    }

    // Lọc sản phẩm lỗi (hết hàng hoặc bị vô hiệu hóa)
    const invalidItems = items.filter(
      (i) => i.product.stock <= 0 || i.product.isActive === false
    );

    if (invalidItems.length > 0) {
      const names = invalidItems
        .map((i) => i.product.name || "Sản phẩm không xác định")
        .join(", ");

      showError(
        `Không thể thanh toán. ${
          invalidItems.length > 1 ? "Các sản phẩm" : "Sản phẩm"
        } sau đã hết hàng hoặc ngưng bán: ${names}`,
        { duration: 6000 }
      );
      return; 
    }

    navigate("/checkout");
  };

  return {
    items,
    loading,
    error,
    handleAdd,
    handleUpdate,
    handleRemove,
    handleCheckout,
  };
};

export default useCart;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, addToCart, updateCart, removeFromCart } from "../slices/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
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

  return {
    items,
    loading,
    error,
    handleAdd,
    handleUpdate,
    handleRemove,
  };
};

export default useCart;

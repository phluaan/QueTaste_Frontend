// hooks/useCancelOrder.js
import { useDispatch } from "react-redux";
import { cancelOrder, requestCancelOrder } from "../slices/orderSlice";

const useCancelOrder = () => {
  const dispatch = useDispatch();

  const handleCancel = (orderId) => {
    if (!orderId) return;
    dispatch(cancelOrder(orderId));
  };

  const handleRequestCancel = (orderId, reason) => {
    if (!orderId || !reason) return;
    dispatch(requestCancelOrder({ orderId, reason }));
  };

  return { handleCancel, handleRequestCancel };
};

export default useCancelOrder;

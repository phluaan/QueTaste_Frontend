// hooks/useOrderActions.js
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reOrder,
  cancelOrder,
  requestCancelOrder,
  confirmReceivedOrder,
} from "../slices/orderSlice";

const useOrderActions = () => {
  const dispatch = useDispatch();
  // lấy các state liên quan đến action từ slice (bạn đã có canceling/cancelError)
  const { canceling, cancelError } = useSelector((s) => s.userOrders);
  const cartLoading = useSelector((s) => s.cart.loading); // khi reOrder sẽ dùng loading của cart

  const reorder = useCallback(
    async (orderId) => {
      // trả về action để caller có thể check fulfilled/rejected
      return await dispatch(reOrder({ orderId }));
    },
    [dispatch]
  );

  const cancel = useCallback(
    async (orderId) => {
      return await dispatch(cancelOrder(orderId));
    },
    [dispatch]
  );

  const requestCancel = useCallback(
    async (orderId, reason) => {
      return await dispatch(requestCancelOrder({ orderId, reason }));
    },
    [dispatch]
  );

  const confirmReceived = useCallback(
    async (orderId) => {
      return await dispatch(confirmReceivedOrder({ orderId }));
    },
    [dispatch]
  );

  // loading tổng hợp cho các action
  const loading = useMemo(
    () => ({
      reorder: cartLoading,
      cancel: canceling,
      requestCancel: canceling,
      confirmReceived: canceling,
    }),
    [cartLoading, canceling]
  );

  return {
    // handlers
    reorder,
    cancel,
    requestCancel,
    confirmReceived,
    // states
    loading,
    error: { cancel: cancelError },
  };
};

export default useOrderActions;

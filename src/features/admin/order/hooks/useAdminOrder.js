import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  confirmOrderSlice,
  confirmOrdersSlice,
  cancelOrdersSlice,
  callShipper,
} from "../slices/adminOrderSlice";

// useAdminOrders.js
const useAdminOrders = ({ status, search, page, limit }) => {
  const dispatch = useDispatch();
  const { allOrders, pagination, loading, error } = useSelector(
    (s) => s.adminOrders
  );

  useEffect(() => {
    dispatch(getAllOrders({ status, search, page, limit }));
  }, [dispatch, status, search, page, limit]);

  const confirmOrder = (orderId) => {
    dispatch(confirmOrderSlice(orderId));
  };

  const confirmOrders = (listOrderId) => {
    //console.log("Xác nhận nhiều đơn hàng");
    //console.log(listOrderId);
    dispatch(confirmOrdersSlice(listOrderId));
  };

  const cancelOrders = (listOrderId) => {
    console.log("Hủy nhiều đơn hàng");
    dispatch(cancelOrdersSlice(listOrderId));
  };

  const handleCallShipper = async (orderIds) => {
    if (!orderIds || orderIds.length === 0) return;
    await dispatch(callShipper(orderIds));
  };

  return {
    orders: allOrders,
    pagination: pagination,
    loading: loading,
    error: error,
    confirmOrder,
    confirmOrders,
    cancelOrders,
    handleCallShipper,
  };
};

export default useAdminOrders;

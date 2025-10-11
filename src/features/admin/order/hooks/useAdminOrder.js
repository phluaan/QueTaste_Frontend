import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, confirmOrderSlice } from "../slices/adminOrderSlice";

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

  return {
    orders: allOrders,
    pagination: pagination,
    loading: loading,
    error: error,
    confirmOrder,
  };
};

export default useAdminOrders;

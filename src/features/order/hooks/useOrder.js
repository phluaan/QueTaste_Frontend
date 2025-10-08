// hooks/useOrders.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, cancelOrder } from "../slices/orderSlice";

const useOrder = (status = "all", search = "", page = 1, limit = 10) => {
  const dispatch = useDispatch();
  const {
    myOrders: orders,
    pagination: pagination,
    loading: loading,
    error: error,
  } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(getMyOrders({ status, search, page, limit }));
  }, [dispatch, status, search, page, limit]);

  return { orders, loading, error, pagination };
};

export default useOrder;

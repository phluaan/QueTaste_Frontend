import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../order/slices/orderSlice";

// useAdminOrders.js
const useAdminOrders = ({ status, search, page, limit }) => {
  const dispatch = useDispatch();
  const { allOrders, allPagination, loadingAllOrders, errorAllOrders } = useSelector((s) => s.order);

  useEffect(() => {
    dispatch(getAllOrders({ status, search, page, limit }));
  }, [dispatch, status, search, page, limit]);

  return { orders: allOrders, pagination: allPagination, loading: loadingAllOrders, error: errorAllOrders };
};

export default useAdminOrders;
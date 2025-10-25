import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderTracking } from "../slices/orderSlice";

export const useOrderTracking = (orderId) => {
  const dispatch = useDispatch();

  const { tracking } = useSelector((state) => state.userOrders);
  const { data, loading, error } = tracking || {};

  useEffect(() => {
    console.log("Order Id: ", orderId);
    if (orderId) dispatch(fetchOrderTracking(orderId));
  }, [orderId, dispatch]);

  return { order: data, loading, error };
};

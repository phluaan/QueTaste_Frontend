import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchShipperOrders,
  markAsDone,
  requestCancel,
} from "../slices/shipperOrderSlice";

const useShipperOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.shipperOrders
  );

  useEffect(() => {
    dispatch(fetchShipperOrders());
  }, [dispatch]);

  const handleMarkDone = (id) => {
    dispatch(markAsDone(id));
  };

  const handleRequestCancel = (id) => {
    dispatch(requestCancel(id));
  };

  return {
    orders,
    loading,
    error,
    handleMarkDone,
    handleRequestCancel,
  };
};

export default useShipperOrders;

import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/checkoutSlice";

const useCheckout = () => {
    const dispatch = useDispatch();
    const { loading, error, order } = useSelector((state) => state.checkout);

    const handleCheckout = (data) => {
        dispatch(createOrder(data));
    };

    return { loading, error, order, handleCheckout };
};

export default useCheckout;
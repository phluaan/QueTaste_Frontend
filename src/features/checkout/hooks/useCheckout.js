import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/checkoutSlice";
import { showSuccess, showError } from "../../../utils/toastUtils";

const useCheckout = () => {
    const dispatch = useDispatch();
    const { loading, error, order } = useSelector((state) => state.checkout);

    const handleCheckout = async (data) => {
        try {
        const result = await dispatch(createOrder(data)).unwrap();
        showSuccess("Đặt hàng thành công! 🎉");
        return result;
        } catch (err) {
        showError("Đặt hàng thất bại, vui lòng thử lại!");
        throw err;
        }
    };

    return { loading, error, order, handleCheckout };
};

export default useCheckout;
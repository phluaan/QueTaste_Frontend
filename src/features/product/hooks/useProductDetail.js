import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../slices/productSlice";

const useProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { productDetail, loading, error } = useSelector((state) => state.product);

    const [ quantity, setQuantity ] = useState(1);
    const [ currentImageIndex, setCurrentImageIndex] = useState(0);
    const [ activeTab, setActiveTab] = useState("Description");

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetail(id));
        }
    }, [id, dispatch]);

    const increaseQuantity = () => setQuantity((prev) => prev < (productDetail?.stock || 1) ? prev + 1 : prev);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // Add to Cart
    const handleAddToCart = () => {

    };

    return {
        productDetail,
        loading,
        error,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        handleAddToCart,
        currentImageIndex,
        setCurrentImageIndex,
        activeTab,
        setActiveTab
    };
};
export default useProductDetail;
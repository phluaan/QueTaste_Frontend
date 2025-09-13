// src/hooks/useProductDetail.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../slices/productSlice";
import { addToCart } from "../../cart/slices/cartSlice";
import { showSuccess, showError } from "../../../utils/toastUtils"
import { useNavigate, useLocation } from "react-router-dom";

const useProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetail, loading, error } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [id, dispatch]);

  const increaseQuantity = () =>
    setQuantity((prev) =>
      prev < (productDetail?.stock || 1) ? prev + 1 : prev
    );

  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to Cart
  const handleAddToCart = () => {
    if (!accessToken) {
      showError("Please login to continue");
      navigate("/login", {state: {from: location.pathname}});
      return;
    }

    if (!productDetail) {
      showError("Product not found!");
      return;
    }

    if (productDetail.stock <= 0) {
      showError("Out of stock!");
      return;
    }

    dispatch(
      addToCart({
        productId: productDetail._id,
        name: productDetail.name,
        price: productDetail.price,
        salePrice: productDetail.salePrice,
        quantity,
        image: productDetail.images?.[0],
      })
    );

    
    showSuccess(`${productDetail.name} added to cart!`);
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
    setActiveTab,
  };
};

export default useProductDetail;

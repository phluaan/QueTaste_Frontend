// src/hooks/useProductDetail.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../slices/productSlice";
import { addToCart } from "../../cart/slices/cartSlice";
import { showSuccess, showError } from "../../../utils/toastUtils"
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchRelatedProducts,
  addViewedProduct,
  fetchProductStats,
  fetchViewedProducts
} from "../slices/extraProductSlice";
import { fetchFavorites, addFavorite, removeFavorite } from "../slices/favoriteSlice";

const useProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { related, viewed, stats } = useSelector((state) => state.extraProduct);
  const { list: favorites } = useSelector((s) => s.favorite);
  const { productDetail, loading, error } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const accessToken = useSelector((state) => state.auth.accessToken);

  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
      dispatch(fetchRelatedProducts(id));
      dispatch(addViewedProduct(id));
      dispatch(fetchFavorites());
      dispatch(fetchViewedProducts());
      dispatch(fetchProductStats(id));
    }
  }, [id, dispatch]);

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

    
    showSuccess(`${productDetail.name} đã được thêm vào giỏ hàng!`);
  };

  const isFavorite = favorites.some(
    (f) =>
      f.productId?._id === productDetail?._id || f.productId === productDetail?._id
  );

  const toggleFavorite = () => {
    if (!accessToken) {
      showError("Please login to add favorites");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (isFavorite) dispatch(removeFavorite(productDetail._id));
    else dispatch(addFavorite(productDetail._id));
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
    related,
    viewed,
    stats,
    isFavorite,
    toggleFavorite,
    favorites,
  };
};

export default useProductDetail;

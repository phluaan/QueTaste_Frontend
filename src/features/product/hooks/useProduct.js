// src/hooks/useProduct.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchNewestProducts,
  fetchBestSellingProducts,
  fetchMostViewedProducts,
  fetchTopDiscountProducts,
} from "../slices/productSlice";

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    newest,
    bestSelling,
    mostViewed,
    topDiscount,
    loading,
  } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [filterCriteria, setFilterCriteria] = useState(""); // "" = show all

  // Fetch dữ liệu
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchNewestProducts());
    dispatch(fetchBestSellingProducts());
    dispatch(fetchMostViewedProducts());
    dispatch(fetchTopDiscountProducts());
  }, [dispatch]);

  // Chọn bộ lọc hiển thị sản phẩm
  const getFilteredProducts = () => {
    switch (filterCriteria) {
      case "newest":
        return newest;
      case "best":
        return bestSelling;
      case "views":
        return mostViewed;
      case "discount":
        return topDiscount;
      default:
        return allProducts; // show tất cả sản phẩm nếu không chọn filter
    }
  };

  // Lọc theo search input
  const displayedProducts = getFilteredProducts().filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,
    filterCriteria,
    setFilterCriteria,
    displayedProducts,
    loading,
  };
};

export default useProduct;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, setPage } from "../slices/productSlice";

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, totalPage, currentPage } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // gọi API mỗi khi filter thay đổi
  useEffect(() => {
    const query = { page: currentPage, limit: 12 };

    // search
    if (search) query.search = search;

    // sort
    switch (filterCriteria) {
      case "newest":
        query.sortBy = "createdAt";
        query.order = "desc";
        break;
      case "best":
        query.sortBy = "totalSold";
        query.order = "desc";
        break;
      case "views":
        query.sortBy = "views";
        query.order = "desc";
        break;
      case "discount":
        query.sortBy = "discount";
        query.order = "desc";
        break;
      default:
        break;
    }

    // price
    if (priceFilter === "lt100") query.maxPrice = 100000;
    if (priceFilter === "100-200") {
      query.minPrice = 100000;
      query.maxPrice = 200000;
    }
    if (priceFilter === "200-500") {
      query.minPrice = 200000;
      query.maxPrice = 500000;
    }
    if (priceFilter === "gt500") query.minPrice = 500000;

    // rating
    if (ratingFilter) query.rating = ratingFilter;

    // region
    if (regionFilter) query.region = regionFilter;

    dispatch(fetchAllProducts(query));
  }, [dispatch, search, filterCriteria, priceFilter, ratingFilter, regionFilter, currentPage]);

  return {
    search, setSearch,
    filterCriteria, setFilterCriteria,
    priceFilter, setPriceFilter,
    ratingFilter, setRatingFilter,
    regionFilter, setRegionFilter,
    products,
    loading,
    totalPage, currentPage,
    setPage: (page) => dispatch(setPage(page)),
  };
};

export default useProduct;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../slices/productSlice";

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  const [search, setSearch] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // gọi API mỗi khi filter thay đổi
  useEffect(() => {
    const query = {};

    // search
    if (search) query.search = search;

    // sort
    switch (filterCriteria) {
      case "newest":
        query.sortBy = "createdAt";
        query.order = "desc";
        query.limit = 8;
        break;
      case "best":
        query.sortBy = "totalSold";
        query.order = "desc";
        query.limit = 6;
        break;
      case "views":
        query.sortBy = "views";
        query.order = "desc";
        query.limit = 8;
        break;
      case "discount":
        query.sortBy = "discount";
        query.order = "desc";
        query.limit = 4;
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
  }, [dispatch, search, filterCriteria, priceFilter, ratingFilter, regionFilter]);

  return {
    search, setSearch,
    filterCriteria, setFilterCriteria,
    priceFilter, setPriceFilter,
    ratingFilter, setRatingFilter,
    regionFilter, setRegionFilter,
    products,
    loading,
  };
};

export default useProduct;

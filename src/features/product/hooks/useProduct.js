import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, setPage } from "../slices/productSlice";
import { useLocation } from "react-router-dom";

const getInitialState = () => {
  const saved = sessionStorage.getItem("productPage");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
};

const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, totalPage, currentPage } = useSelector(
    (state) => state.product
  );

  const init = getInitialState();

  // lấy từ sessionStorage nếu có (quay lại từ trang khác)
  const [search, _setSearch] = useState(init.search || "");
  const [filterCriteria, _setFilterCriteria] = useState(init.filterCriteria || "newest");
  const [priceFilter, _setPriceFilter] = useState(init.priceFilter || "");
  const [ratingFilter, _setRatingFilter] = useState(init.ratingFilter || "");
  const [regionFilter, _setRegionFilter] = useState(init.regionFilter || "");

  const location = useLocation();
  // Mỗi lần thay đổi filter, reset trang 1
  const setSearch = (v) => { _setSearch(v); dispatch(setPage(1)); };
  const setFilterCriteria = (v) => { _setFilterCriteria(v); dispatch(setPage(1)); };
  const setPriceFilter = (v) => { _setPriceFilter(v); dispatch(setPage(1)); };
  const setRatingFilter = (v) => { _setRatingFilter(v); dispatch(setPage(1)); };
  const setRegionFilter = (v) => { _setRegionFilter(v); dispatch(setPage(1)); };

  // Lưu state khi rời ProductPage
  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        "productPage",
        JSON.stringify({
          page: currentPage,
          scrollY: window.scrollY,
          search,
          filterCriteria,
          priceFilter,
          ratingFilter,
          regionFilter,
        })
      );
    };
  }, [currentPage, search, filterCriteria, priceFilter, ratingFilter, regionFilter]);

  // Khi quay lại productPage → khôi phục page + scroll
  useEffect(() => {
    if (location.pathname === "/product") {
      const saved = sessionStorage.getItem("productPage");
      if (saved) {
        const state = JSON.parse(saved);

        if (state.page && state.page !== currentPage) {
          dispatch(setPage(state.page));
        }
        setTimeout(() => {
          window.scrollTo(0, state.scrollY || 0);
        }, 200);
      }
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // gọi API khi filter/page đổi
  useEffect(() => {
    const query = { page: currentPage, limit: 12 };

    if (search) query.search = search;

    switch (filterCriteria) {
      case "newest": query.sortBy = "createdAt"; query.order = "desc"; break;
      case "best": query.sortBy = "totalSold"; query.order = "desc"; break;
      case "views": query.sortBy = "views"; query.order = "desc"; break;
      case "discount": break;
      default: break;
    }

    if (priceFilter === "lt100") query.maxPrice = 100000;
    if (priceFilter === "100-200") { query.minPrice = 100000; query.maxPrice = 200000; }
    if (priceFilter === "200-500") { query.minPrice = 200000; query.maxPrice = 500000; }
    if (priceFilter === "gt500") query.minPrice = 500000;

    if (ratingFilter) query.rating = ratingFilter;
    if (regionFilter) query.region = regionFilter;

    dispatch(fetchAllProducts(query));
  }, [dispatch, search, filterCriteria, priceFilter, ratingFilter, regionFilter, currentPage]);

  const sortedProducts = filterCriteria === "discount"
  ? [...products].sort((a, b) => {
      const discountA = a.salePrice && a.salePrice < a.price
        ? ((a.price - a.salePrice) / a.price) * 100
        : 0;
      const discountB = b.salePrice && b.salePrice < b.price
        ? ((b.price - b.salePrice) / b.price) * 100
        : 0;
      return discountB - discountA;
    })
  : products;

  return {
    search, setSearch,
    filterCriteria, setFilterCriteria,
    priceFilter, setPriceFilter,
    ratingFilter, setRatingFilter,
    regionFilter, setRegionFilter,
    products: sortedProducts,
    loading,
    totalPage, currentPage,
    setPage: (page) => dispatch(setPage(page)),
  };
};

export default useProduct;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../slices/adminReviewSlice";

// ✅ dùng object cho dễ đọc
const useReview = ({
  productId = null,
  rating = null,
  search = "",
  orderBy = "newest",
  page = 1,
  limit = 10,
} = {}) => {
  const dispatch = useDispatch();

  const { reviews, pagination, loading, error } = useSelector(
    (state) => state.adminReviews
  );

  useEffect(() => {
    dispatch(
      getAllReviews({ productId, rating, search, orderBy, page, limit })
    );
  }, [dispatch, productId, rating, search, orderBy, page, limit]);

  return { reviews, pagination, loading, error };
};

export default useReview;

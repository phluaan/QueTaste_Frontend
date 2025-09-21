import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReview, createReview } from "../slices/reviewSlice";

const useReview = (productId, rating = null, orderBy = "newest", page = 1, limit = 10) => {
  const dispatch = useDispatch();
  const { reviews, pagination, loading, error } = useSelector(
    (state) => state.review
  );

  // Load review khi productId hoặc sort/page thay đổi
  useEffect(() => {
    if (productId) {
      dispatch(getReview({ productId, rating, orderBy, page, limit }));
    }
  }, [dispatch, productId, rating, orderBy, page, limit]);

  const submitReview = async ({ productId, orderId, rating, comment }) => {
    return dispatch(createReview({ productId, orderId, rating, comment })).unwrap();
  };

  return { reviews, loading, error, pagination, submitReview };
};

export default useReview;

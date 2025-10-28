import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleActiveProduct,
  bulkHideProducts as bulkHideProductsThunk,
  bulkShowProducts as bulkShowProductsThunk,
} from "../slices/adminProductSlice";
let timeout;
const useAdminProducts = (filters) => {
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector(
    (s) => s.adminProducts
  );

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(getAllProducts(filters));
    }, 1000); 
    return () => clearTimeout(timeout);
  }, [dispatch, JSON.stringify(filters)]);

  return {
    products,
    pagination,
    loading,
    error,
    createProduct: (form) => dispatch(createProduct(form)),
    updateProduct: ({ id, formData }) => dispatch(updateProduct({ id, formData })),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    toggleActiveProduct: (id) => dispatch(toggleActiveProduct(id)),
    getProductById: (id) => dispatch(getProductById(id)),
    bulkHideProducts: (ids) => dispatch(bulkHideProductsThunk(ids)),
    bulkShowProducts: (ids) => dispatch(bulkShowProductsThunk(ids)),
  };
};

export default useAdminProducts;

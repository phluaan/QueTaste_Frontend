import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import {
    fetchAllProducts,
    fetchNewestProducts,
    fetchBestSellingProducts,
    fetchMostViewedProducts,
    fetchTopDiscountProducts,
} from "../slices/productSlice";

const ProductPage = () => {
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

    useEffect(() => {
        // Load tất cả sản phẩm + các filter
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

    return (
        <div>
        {/* Thanh tìm kiếm */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center gap-4">
            <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 border rounded px-3 py-2"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Tìm kiếm
            </button>
        </div>

        {/* Bộ lọc */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="border rounded px-3 py-2"
            >
            <option value="">-- Tiêu chí --</option>
            <option value="newest">8 sản phẩm mới nhất</option>
            <option value="best">6 sản phẩm bán chạy</option>
            <option value="views">8 sản phẩm xem nhiều</option>
            <option value="discount">4 sản phẩm khuyến mãi</option>
            </select>

            {/* Có thể thêm filter vùng miền, giá tiền, đánh giá nếu backend hỗ trợ */}
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {loading[filterCriteria || "all"] ? (
            <p>Loading...</p>
            ) : displayedProducts.length > 0 ? (
            displayedProducts.map((p) => <ProductCard key={p._id} p={p} />)
            ) : (
            <p>Không có sản phẩm nào</p>
            )}
        </div>
        </div>
    );
};

export default ProductPage;

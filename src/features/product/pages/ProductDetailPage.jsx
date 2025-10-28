import React from "react";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import useProductDetail from "../hooks/useProductDetail";
import Header from "../../../components/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "../../../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductDetailTabs from "../components/ProductDetailTab";

const ProductDetailPage = () => {
  const {
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
    related,
    viewed,
    stats,
    isFavorite,
    toggleFavorite,
  } = useProductDetail();

  if (loading.detail)
    return <p className="text-center text-que-primary"> Loading... </p>;
  if (error) return <p className="text-center text-que-danger"> ❌ {error} </p>;
  if (!productDetail) return null;
  if (productDetail) {
    console.log(productDetail);
  }
  if (stats) {
    console.log(stats);
  }

  return (
    <div className="min-h-screen bg-que-background">
      {/* Main Content */}
      <main className="w-full px-8 pt-8 pb-16 bg-que-background">
        {/* Breadcrumb */}
        <div className="text-base md:text-lg mb-8 font-medium ml-10">
          <a href="/" className="text-que-text-main hover:text-que-primary">
            Home
          </a>
          <span className="text-que-text-muted mx-3">&gt;</span>
          <a
            href="/products"
            className="text-que-text-main hover:text-que-primary"
          >
            Product
          </a>
          <span className="text-que-text-muted mx-3">&gt;</span>
          <span className="text-que-text-muted hover:text-que-primary">
            {productDetail.name}
          </span>
        </div>

        {/* Product Section */}
        <div className="bg-que-surface border rounded-lg shadow-sm p-8 max-w-[90rem] mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div>
              {/* Main Image Swiper */}
              <div className="relative w-full h-[450px] bg-que-surface rounded-lg overflow-hidden flex items-center justify-center">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  onSwiper={(swiper) => {
                    setTimeout(() => {
                      if (swiper?.navigation) {
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }
                    });
                  }}
                  onSlideChange={(swiper) =>
                    setCurrentImageIndex(swiper.activeIndex)
                  }
                  className="w-full h-full"
                >
                  {productDetail.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={`${productDetail.name}-${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Arrows */}
                <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-que-surface/70 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-2xl">
                  ‹
                </div>
                <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-que-surface/70 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-2xl">
                  ›
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center mt-4 relative">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={80}
                  slidesPerView={6}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="max-w-[600px]"
                >
                  {productDetail.images.map((img, idx) => (
                    <SwiperSlide key={idx} className="flex justify-center">
                      <div
                        onClick={() => {
                          setCurrentImageIndex(idx);
                          document
                            .querySelector(".swiper")
                            ?.swiper.slideTo(idx);
                        }}
                        className={`cursor-pointer border rounded-lg overflow-hidden w-[80px] h-[80px] flex items-center justify-center ${
                          currentImageIndex === idx
                            ? "ring-1 ring-que-text-muted"
                            : ""
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${productDetail.name}-thumb-${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* nút prev */}
                {productDetail.images.length > 6 && (
                  <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 bg-que-surface/70 hover:bg-que-surface rounded-full p-2 shadow cursor-pointer z-10 text-lg">
                    ‹
                  </div>
                )}

                {/* nút next */}
                {productDetail.images.length > 6 && (
                  <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 bg-que-surface/70 hover:bg-que-surface rounded-full p-2 shadow cursor-pointer z-10 text-lg">
                    ›
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-que-text-main">
                  {productDetail.name}
                </h1>
                <p className="text-que-text-muted">{productDetail.category}</p>

                <div className="flex items-center mt-2">
                  <span className="ml-2 text-que-text-muted mr-1">
                    {productDetail.averageRating}
                  </span>
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={
                        idx < Math.floor(productDetail.rating)
                          ? "text-que-accent"
                          : "text-que-text-muted"
                      }
                    />
                  ))}
                  <span className="ml-1 text-que-text-muted">
                    | {productDetail.totalReviews} Đánh giá
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="line-through text-que-text-muted">
                  ${productDetail.price}
                </span>
                <span className="text-3xl font-bold text-que-accent">
                  ${productDetail.salePrice}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BsCheckCircleFill className="text-que-secondary" />
                <span className="text-que-secondary">
                  In Stock ({productDetail.stock} available)
                </span>
                <span className="text-que-text-muted">
                  | Đã bán {productDetail.totalSold}
                </span>
              </div>
              <p className="text-que-text-muted">{productDetail.description}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-2 text-que-text-muted hover:text-que-primary"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-2 text-que-text-muted hover:text-que-primary"
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-8 py-2 bg-que-primary text-white rounded-lg hover:bg-opacity-90"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex items-center space-x-2 text-que-text-muted hover:text-que-primary"
                  onClick={toggleFavorite}
                >
                  <FiHeart className={isFavorite ? "text-que-danger" : ""} />
                  <span>
                    {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-que-text-muted hover:text-que-primary">
                  <FiRefreshCw />
                  <span>Compare</span>
                </button>
              </div>

              <div className="bg-que-surface p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <BsCheckCircleFill className="text-que-primary" />
                    <span>Free shipping over $100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BsCheckCircleFill className="text-que-primary" />
                    <span>1-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BsCheckCircleFill className="text-que-primary" />
                    <span>100% authentic guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductDetailTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            productDetail={productDetail}
          />
        </div>
        {/* Sản phẩm tương tự */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {related.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        </div>

        {/* Sản phẩm đã xem */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">Bạn đã xem gần đây</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {viewed
              .filter((v) => v._id !== productDetail._id)
              .map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;

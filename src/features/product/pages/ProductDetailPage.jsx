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
    related,
    viewed,
    stats,
    isFavorite,
    toggleFavorite,
    favorites,
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
            Trang chủ
          </a>
          <span className="text-que-text-muted mx-3">&gt;</span>
          <a
            href="/products"
            className="text-que-text-main hover:text-que-primary"
          >
            Sản phẩm
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
                  {productDetail.price} VNĐ
                </span>
                <span className="text-3xl font-bold text-que-accent">
                  {productDetail.salePrice} VNĐ
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BsCheckCircleFill className="text-que-secondary" />
                <span className="text-que-secondary">
                  Còn hàng ({productDetail.stock} có sẵn)
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
                    {isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                  </span>
                </button>

              </div>


            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductDetailTabs
            productDetail={productDetail}
          />
        </div>
          {/* Sản phẩm tương tự */}
          <div className="mt-14 relative">
            <h2 className="text-xl font-bold mb-5">Sản phẩm tương tự</h2>

            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              navigation={{
                nextEl: ".related-next-btn",
                prevEl: ".related-prev-btn",
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
            >
              {related.map((p) => (
                <SwiperSlide key={p._id}>
                  <ProductCard p={p} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Nút điều hướng trái/phải */}
            {related.length > 4 && (
              <>
                <div className="related-prev-btn absolute -left-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ‹
                </div>
                <div className="related-next-btn absolute -right-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ›
                </div>
              </>
            )}
          </div>

          {/* Sản phẩm đã xem gần đây */}
          <div className="mt-14 relative">
            <h2 className="text-xl font-bold mb-5">Bạn đã xem gần đây</h2>

            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              navigation={{
                nextEl: ".viewed-next-btn",
                prevEl: ".viewed-prev-btn",
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
            >
              {viewed
                .filter((v) => v._id !== productDetail._id)
                .map((p) => (
                  <SwiperSlide key={p._id}>
                    <ProductCard p={p} />
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Nút điều hướng trái/phải */}
            {viewed.length > 4 && (
              <>
                <div className="viewed-prev-btn absolute -left-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ‹
                </div>
                <div className="viewed-next-btn absolute -right-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ›
                </div>
              </>
            )}
          </div>

          {/* Sản phẩm yêu thích */}
          <div className="mt-14 relative">
            <h2 className="text-xl font-bold mb-5">Sản phẩm bạn yêu thích</h2>

            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              navigation={{
                nextEl: ".favorite-next-btn",
                prevEl: ".favorite-prev-btn",
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
            >
              {favorites
                ?.map((f) => f.productId || f) 
                ?.filter((p) => p && p.isActive && p.stock > 0)
                ?.filter((p) => p._id !== productDetail._id)
                ?.map((p) => (
                  <SwiperSlide key={p._id}>
                    <ProductCard p={p} />
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Nút điều hướng trái/phải */}
            {favorites?.filter((f) => f?.productId?.isActive && f?.productId?.stock > 0)?.length > 4 && (
              <>
                <div className="favorite-prev-btn absolute -left-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ‹
                </div>
                <div className="favorite-next-btn absolute -right-8 top-1/2 -translate-y-1/2 bg-que-surface/80 hover:bg-que-surface rounded-full p-3 shadow cursor-pointer z-10 text-lg">
                  ›
                </div>
              </>
            )}
          </div>

      </main>
    </div>
  );
};

export default ProductDetailPage;

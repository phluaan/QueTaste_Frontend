import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import usePost from "../features/post/hooks/usePost";
import PostCard from "../features/post/components/PostCard";

const Home = () => {
  const { allPosts, loading, error } = usePost({ admin: false });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <header className="relative bg-[url('https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=')] bg-cover bg-center">
        <div className="bg-black/45">
          <div className="max-w-6xl mx-auto px-6 py-24 text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">QueTaste — Hương vị quê nhà</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
              Kết nối sản phẩm địa phương, tôn vinh hương vị truyền thống và câu chuyện của mỗi vùng miền.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/products" className="px-5 py-3 border border-white text-white rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition">Khám phá đặc sản</a>
              <a href="#about" className="px-5 py-3 border border-white text-white rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition">Tìm hiểu thêm</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-4">
        <section id="posts" className="mt-12">
          <h3 className="text-xl font-bold mb-4">Bài viết nổi bật</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : allPosts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {allPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p>Chưa có bài viết nào</p>
          )}
        </section>

        <section id="about" className="mt-12 bg-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-bold">Vì sao chọn QueTaste?</h3>
          <p className="mt-3 text-gray-700">
            QueTaste hợp tác trực tiếp với các nhà sản xuất vùng miền để đảm bảo nguồn gốc — chất lượng sản phẩm — và câu chuyện đằng sau từng món đặc sản. Chúng tôi hỗ trợ quảng bá, đóng gói và vận chuyển tới tay bạn.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/about" className="text-sm px-4 py-2 bg-indigo-600 text-white rounded">Tìm hiểu thêm</a>
            <a href="/contact" className="text-sm px-4 py-2 border rounded">Liên hệ hợp tác</a>
          </div>
        </section>

        <section className="mt-8 rounded-lg p-6 bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold">Nhận thông tin sản phẩm & khuyến mãi</h4>
              <p className="text-sm text-gray-600">Đăng ký nhận email để không bỏ lỡ đặc sản theo mùa.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <input aria-label="email" className="px-3 py-2 rounded border w-full sm:w-72" placeholder="Nhập email của bạn" />
              <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded">Đăng ký</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
// src/pages/Home.js
import React from "react";

const Home = () => {
    return (
        <main className="min-h-screen bg-gray-50">
        {/* HERO */}
        <header className="relative bg-[url('https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=')] bg-cover bg-center">
            <div className="bg-black/45">
            <div className="max-w-6xl mx-auto px-6 py-24 text-white">
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                QueTaste — Hương vị quê nhà
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
                Kết nối sản phẩm địa phương, tôn vinh hương vị truyền thống và câu
                chuyện của mỗi vùng miền.
                </p>
                <div className="mt-6 flex gap-3">
                <a
                    href="/products"
                    className="px-5 py-3 border border-white text-white rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition"
                >
                    Khám phá đặc sản
                </a>

                <a
                    href="#about"
                    className="px-5 py-3 border border-white text-white rounded-md text-sm font-medium hover:bg-white hover:text-indigo-600 transition"
                >
                    Tìm hiểu thêm
                </a>
                </div>
            </div>
            </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Quick categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {["Trái cây", "Hải sản", "Đồ uống", "Bánh kẹo"].map((c) => (
                <button
                key={c}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md"
                >
                <div className="w-12 h-12 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600 font-bold">
                    {c[0]}
                </div>
                <div className="text-sm font-semibold">{c}</div>
                </button>
            ))}
            </div>

            {/* About / mission */}
            <section id="about" className="mt-12 bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold">Vì sao chọn QueTaste?</h3>
            <p className="mt-3 text-gray-700">
                QueTaste hợp tác trực tiếp với các nhà sản xuất vùng miền để đảm bảo
                nguồn gốc — chất lượng sản phẩm — và câu chuyện đằng sau từng món đặc
                sản. Chúng tôi hỗ trợ quảng bá, đóng gói và vận chuyển tới tay bạn.
            </p>
            <div className="mt-4 flex gap-3">
                <a
                href="/about"
                className="text-sm px-4 py-2 bg-indigo-600 text-white rounded"
                >
                Tìm hiểu thêm
                </a>
                <a href="/contact" className="text-sm px-4 py-2 border rounded">
                Liên hệ hợp tác
                </a>
            </div>
            </section>

            {/* Newsletter */}
            <section className="mt-8 rounded-lg p-6 bg-gradient-to-r from-indigo-50 to-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                <h4 className="text-lg font-bold">
                    Nhận thông tin sản phẩm & khuyến mãi
                </h4>
                <p className="text-sm text-gray-600">
                    Đăng ký nhận email để không bỏ lỡ đặc sản theo mùa.
                </p>
                </div>
                <form className="flex gap-2 w-full sm:w-auto">
                <input
                    aria-label="email"
                    className="px-3 py-2 rounded border w-full sm:w-72"
                    placeholder="Nhập email của bạn"
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Đăng ký
                </button>
                </form>
            </div>
            </section>
        </div>

        <footer className="mt-12 bg-white border-t">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
                <div className="text-xl font-bold">QueTaste</div>
                <p className="text-sm text-gray-600 mt-2">
                Quảng bá đặc sản quê hương — kết nối nông dân và người tiêu dùng.
                </p>
            </div>
            <div className="text-sm text-gray-600">
                <div>Liên hệ: chimsedinang@gmail.com</div>
                <div className="mt-2">
                © {new Date().getFullYear()} QueTaste
                </div>
            </div>
            </div>
        </footer>
        </main>
    );
};

export default Home;
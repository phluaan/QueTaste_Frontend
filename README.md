# 🌾 QueTaste Frontend – Giao diện bán đặc sản vùng miền

Đây là frontend của hệ thống QueTaste, nơi người dùng có thể duyệt đặc sản địa phương, thêm vào giỏ, đặt hàng và theo dõi đơn hàng.
Giao diện được xây dựng với React + Tailwind, tối ưu cho trải nghiệm đơn giản, rõ ràng và responsive.

---

## 🛠 Tech Stack

- ReactJS
- Tailwind CSS (UI responsive, component-based)
- React Router DOM (điều hướng trang)
- Axios (gọi API backend)
- Context / custom hooks (quản lý auth, giỏ hàng, thông báo realtime)

---

## 👨‍👩‍👧‍👦 Tính năng giao diện

### Khách vãng lai
- Xem danh sách sản phẩm, lọc theo loại / vùng / giá
- Tìm kiếm sản phẩm + gợi ý khi gõ
- Xem chi tiết sản phẩm (mô tả, hình ảnh, giá, đánh giá, sản phẩm tương tự)
- Đăng ký / Đăng nhập / Quên mật khẩu (OTP email)

### Khách hàng (đã đăng nhập)
- Giỏ hàng: thêm sản phẩm, chỉnh số lượng, xóa
- Thanh toán: nhập địa chỉ nhận hàng, chọn phương thức thanh toán (COD / ví điện tử), áp mã giảm giá
- Theo dõi đơn hàng, hủy đơn trong giới hạn cho phép, xác nhận đã nhận hàng, mua lại đơn cũ
- Lưu sản phẩm yêu thích
- Xem sản phẩm đã xem gần đây
- Đánh giá sản phẩm đã mua
- Chat với quản trị viên / nhận thông báo (trạng thái đơn hàng, khuyến mãi)

### Giao diện quản trị (Admin UI)
- Quản lý sản phẩm: tạo mới, chỉnh sửa, ẩn/hiện, cập nhật tồn kho và giá
- Quản lý đơn hàng: duyệt đơn, phân công giao hàng, hủy đơn
- Quản lý người dùng
- Quản lý phiếu giảm giá / ưu đãi
- Thống kê cơ bản: doanh thu, sản phẩm bán chạy, hiệu suất khuyến mãi

---

## 📂 Cấu trúc thư mục (tham khảo)

```txt
frontend/
├─ src/
│  ├─ assets/        # Hình ảnh, icon
│  ├─ components/    # Component dùng chung (Button, Card, Modal, ...)
│  ├─ pages/         # Trang (Home, ProductDetail, Cart, Checkout, Orders, Admin, ...)
│  ├─ hooks/         # Custom hooks (auth, cart, product search, ...)
│  ├─ services/      # Gọi API qua Axios
│  ├─ context/       # State người dùng / giỏ hàng / thông báo
│  ├─ App.jsx
│  └─ main.jsx
└─ tailwind.config.js

```

## ⚙️ Chạy Frontend cục bộ

```txt
1. Clone repo
   git clone https://github.com/phluaan/QueTaste_Frontend.git
   cd QueTaste_Frontend

2. Cài đặt dependency
   npm install

3. Tạo file .env (ví dụ)

   # Base URL của API backend mà frontend sẽ gọi
   VITE_API_BASE_URL=http://localhost:8088/api
   
   # URL cho WebSocket / Socket.io
   VITE_SOCKET_URL=http://localhost:8088
   
   # MongoDB connection string
   MONGO_URI=mongodb://localhost:27017/mydb
   
   # JWT secrets cho frontend
   JWT_SECRET=<your_jwt_secret>
   JWT_REFRESH_SECRET=<your_jwt_refresh_secret>

4. Chạy dev
   npm run dev

Frontend mặc định chạy tại http://localhost:5173

```

## 👥 Nhóm thực hiện

Nhóm 13 – Khoa CNTT, ĐH Sư phạm Kỹ thuật TP.HCM
- Đỗ Phú Luân – 22110372
- Huỳnh Minh Mẫn – 22110377
- Đặng Minh Nhật – 22110389

Giảng viên hướng dẫn: ThS. Nguyễn Hữu Trung

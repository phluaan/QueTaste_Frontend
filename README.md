# 🌾 QueTaste Frontend – Vị của quê hương

Đây là **frontend** của dự án **QueTaste** – website thương mại điện tử giới thiệu và bán các đặc sản quê hương.  
Ứng dụng được xây dựng bằng **ReactJS** và **Tailwind CSS** để mang lại trải nghiệm người dùng hiện đại, trực quan và dễ sử dụng.  

---

## 🚀 Công nghệ sử dụng
- **ReactJS** – Thư viện xây dựng giao diện người dùng  
- **Tailwind CSS** – Framework CSS tiện lợi cho việc thiết kế responsive UI  
- **Axios / Fetch API** – Giao tiếp với backend  
- **React Router DOM** – Điều hướng giữa các trang  

---

## 📌 Các chức năng chính (Frontend)

### 👨‍👩‍👧‍👦 Người dùng (Customer)
- Giao diện đăng ký / đăng nhập  
- Trang danh sách sản phẩm, lọc và tìm kiếm theo loại / giá / địa phương  
- Giỏ hàng: thêm, chỉnh sửa, xóa sản phẩm  
- Trang đặt hàng và theo dõi trạng thái đơn hàng  
- Trang giới thiệu đặc sản và vùng miền  

### 🛒 Quản trị viên (Admin UI)
- Trang quản lý sản phẩm (thêm / sửa / xóa)  
- Trang quản lý danh mục  
- Trang quản lý đơn hàng  
- Trang quản lý người dùng  
- Trang quản lý nội dung quảng bá  

---

## ⚙️ Cài đặt & Chạy dự án

1. Clone repo về máy:
   ```bash
   git clone https://github.com/phluaan/QueTaste_Frontend.git
   cd quetaste-frontend
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Chạy ứng dụng ở môi trường development:
   ```bash
   npm start
   ```

4. Mở trình duyệt tại:
   ```
   http://localhost:5173
   ```

---

## 📂 Cấu trúc thư mục (tham khảo)
```
quetaste-frontend/
│── src/
│   ├── assets/        # Hình ảnh, icon
│   ├── components/    # Component dùng chung
│   ├── pages/         # Các trang chính (Home, Product, Cart, Admin...)
│   ├── hooks/         # Custom hooks
│   ├── services/      # Gọi API (Axios)
│   ├── context/       # React Context API (Auth, Cart...)
│   ├── App.js
│   └── index.js
│── public/
│── package.json
```

---

## 📝 Ghi chú
- Repo này **chỉ chứa frontend**.
- Để chạy đầy đủ, cần kết nối với **backend QueTaste** ([repo backend](https://github.com/MihnNathja/QueTaste.git)).  

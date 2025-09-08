import { useState } from "react";
import TabBar from "./TabBar";
import OrderItem from "./OrderItem";
import SearchBar from "./SearchBar";


const OrderForm = () => {
  
  const [searchTerm, setSearchTerm] = useState("");



const orders = [
  {
    id: 101,
    stage: "Hoàn tất",
    status: "completed",
    statusLabel: "Hoàn thành",
    date: "2025-09-01",
    total: 250000,
    products: [
      {
        name: "Áo thun nam",
        image: "https://via.placeholder.com/100",
        quantity: 2,
        price: 100000,
      },
      {
        name: "Quần jeans",
        image: "https://via.placeholder.com/100",
        quantity: 1,
        price: 50000,
      },
    ],
    voucher: { code: "SALE50K", discount: 50000 }
  },
  {
    id: 102,
    stage: "Xử lý đơn",
    status: "pending",
    statusLabel: "Đang xử lý",
    date: "2025-09-05",
    total: 120000,
    products: [
      {
        name: "Giày sneaker",
        image: "https://via.placeholder.com/100",
        quantity: 1,
        price: 120000,
      },
    ],
    voucher: null
  },
  {
    id: 103,
    stage: "Đã hủy",
    status: "cancelled",
    statusLabel: "Đã hủy",
    date: "2025-09-06",
    total: 50000,
    products: [
      {
        name: "Balo thời trang",
        image: "https://via.placeholder.com/100",
        quantity: 1,
        price: 50000,
      },
    ],
    voucher: null
  },
];


  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.id.toString().includes(searchTerm);
    return matchSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tab bar */}
      <TabBar />

      {/* Search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Danh sách đơn hàng */}
      <div>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <p className="text-gray-500">Không tìm thấy đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default OrderForm;

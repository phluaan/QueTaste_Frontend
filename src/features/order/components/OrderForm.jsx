import TabBar from "./TabBar";
import OrderItem from "./OrderItem";
import useOrder from "../hooks/useOrder";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination"

const OrderForm = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // số đơn hàng mỗi trang

  const { orders = [], loading, error, pagination } = useOrder(
    activeTab,
    searchTerm,
    page,
    limit
  );


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <TabBar 
        activeTab={activeTab}         
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1); // reset về trang đầu khi đổi tab
        }}/>
      <SearchBar 
        searchTerm={searchTerm}         
        setSearchTerm={(val) => {
          setSearchTerm(val);
          setPage(1); // reset về trang đầu khi search
        }}/>

      <div className="mt-4">
        {loading && <p>Đang tải đơn hàng...</p>}

        {!loading && !error && orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}

            <Pagination
              page={pagination?.page || page}
              limit={pagination?.limit || limit}
              total={pagination?.total || 0}
              onPageChange={setPage}
            />
          </>
        ) : (
          !loading && !error && (
            <p className="text-gray-500">Không có đơn hàng nào.</p>
          )
        )}
      </div>
    </div>
  );
};

export default OrderForm;

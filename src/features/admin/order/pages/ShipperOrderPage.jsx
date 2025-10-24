import { useState } from "react";
import { useShipperOrders } from "../hooks/useShipperOrder";

export default function ShipperOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { getOrders, markAsDone, requestCancel } = useShipperOrders();

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Đơn hàng đang giao</h1>
      {orders.map((o) => (
        <div
          key={o._id}
          className="border p-4 rounded-lg mb-3 flex justify-between items-center"
        >
          <div>
            <p>
              <b>{o.code}</b> - {o.customer?.fullName}
            </p>
            <p>{o.address}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => markAsDone(o._id)}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Đã giao
            </button>
            <button
              onClick={() => requestCancel(o._id)}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Không giao được
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

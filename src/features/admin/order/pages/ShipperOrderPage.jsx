import { useState } from "react";
import useShipperOrders from "../hooks/useShipperOrders";
import { formatCurrency } from "../../../../utils/format";
import ConfirmModal from "../../../../components/ConfirmModal";
import {
  User,
  MapPin,
  CreditCard,
  Truck,
  Phone,
  DollarSign,
  PackageCheck,
  XCircle,
} from "lucide-react";
import ShipperOrderDetailModal from "../components/ShipperOrderDetailModal";

export default function ShipperOrdersPage() {
  const { orders, loading, handleMarkDone, handleRequestCancel } =
    useShipperOrders();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const openConfirm = (order, type) => {
    setSelectedOrder(order);
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedOrder) return;
    if (actionType === "done") handleMarkDone(selectedOrder._id);
    else if (actionType === "cancel") handleRequestCancel(selectedOrder._id);
    setConfirmOpen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-que-text-muted">
        Đang tải danh sách đơn hàng...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-que-primary flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Đơn hàng đang giao
        </h1>
        <span className="px-3 py-1 text-sm bg-que-secondary/10 text-que-primary rounded-full">
          Tổng: {orders.length} đơn
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-que-text-muted">
          Hiện không có đơn hàng nào đang giao.
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-que-surface border border-que-secondary/20 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              {/* Thông tin đơn hàng */}
              <div className="space-y-2 text-que-text-main">
                <p className="font-semibold text-lg text-que-primary flex items-center gap-2">
                  <PackageCheck className="w-5 h-5" />
                  Mã đơn:{" "}
                  <span className="text-que-accent">#{o._id.slice(-6)}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" /> {o.shippingAddress?.fullName}
                </p>
                <p className="flex items-center gap-2 text-sm text-que-text-muted">
                  <Phone className="w-4 h-4" /> {o.shippingAddress?.phone}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {o.shippingAddress?.address}, {o.shippingAddress?.city}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4" />
                  {o.paymentMethod} –{" "}
                  {o.paymentStatus === "pending"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </p>
                <p className="flex items-center gap-2 font-medium text-que-text-main mt-2">
                  <DollarSign className="w-4 h-4" />
                  Tổng cộng:{" "}
                  <span className="text-que-primary">
                    {formatCurrency(o.finalAmount)}
                  </span>{" "}
                  <span className="text-sm text-que-text-muted">
                    (Phí ship {formatCurrency(o.shippingFee)})
                  </span>
                </p>
              </div>

              {/* Nút hành động */}
              <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
                {/* Nút Đã giao */}
                <button
                  onClick={() => openConfirm(o, "done")}
                  className="group relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl 
               bg-gradient-to-r from-que-primary to-que-accent 
               text-white font-semibold text-sm shadow-md hover:shadow-lg 
               transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-que-primary/40"
                >
                  <PackageCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Đã giao</span>
                </button>

                {/* Nút Không giao được */}
                <button
                  onClick={() => openConfirm(o, "cancel")}
                  className="group relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl 
               bg-gradient-to-r from-red-500 to-rose-600 
               text-white font-semibold text-sm shadow-md hover:shadow-lg 
               transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                >
                  <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Không giao được</span>
                </button>
                <button
                  onClick={() => {
                    console.log(o);
                    setOpenDetail(true);
                    setSelectedOrder(o);
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
             bg-que-secondary/10 text-que-primary font-medium text-sm 
             hover:bg-que-secondary/20 transition-all shadow-sm"
                >
                  🔍 Xem chi tiết
                </button>

                <ShipperOrderDetailModal
                  open={openDetail}
                  onClose={() => {
                    setOpenDetail(false);
                    setSelectedOrder(null);
                  }}
                  order={selectedOrder}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal xác nhận */}
      <ConfirmModal
        open={confirmOpen}
        title={actionType === "done" ? "Xác nhận giao hàng" : "Yêu cầu hủy đơn"}
        message={
          actionType === "done"
            ? "Bạn có chắc chắn đã giao đơn hàng này cho khách chưa?"
            : "Bạn có chắc muốn yêu cầu hủy đơn hàng này không?"
        }
        confirmText={actionType === "done" ? "Đã giao" : "Xác nhận hủy"}
        cancelText="Hủy"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

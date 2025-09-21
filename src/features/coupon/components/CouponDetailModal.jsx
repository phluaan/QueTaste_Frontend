import { Modal, Spin, Tag, Divider, Card } from "antd";
import useCouponDetail from "../hooks/useCouponDetail";
import { GiftOutlined } from "@ant-design/icons";

const renderCouponType = (type, value, maxDiscount) => {
    switch (type) {
        case "fixed":
        return `Giảm cố định ${value?.toLocaleString("vi-VN")}₫`;
        case "percentage":
        return `Giảm ${value}%${
            maxDiscount
            ? ` (tối đa ${maxDiscount.toLocaleString("vi-VN")}₫)`
            : ""
        }`;
        case "free_shipping":
        return "Miễn phí vận chuyển";
        default:
        return type;
    }
    };

    const CouponDetailModal = ({ open, onClose, couponId }) => {
    const { couponDetail, loading, error } = useCouponDetail("detail", couponId);

    return (
        <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        width={720}
        centered
        destroyOnHidden
        >
        {loading.detail ? (
            <div className="flex justify-center py-10">
            <Spin size="large" />
            </div>
        ) : error ? (
            <p className="text-red-500">❌ Lỗi: {error}</p>
        ) : !couponDetail ? (
            <p>Không tìm thấy coupon</p>
        ) : (
            <div>
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg mb-5">
                <div className="flex items-center gap-3">
                <GiftOutlined className="text-3xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800 m-0">
                    {couponDetail.name}
                </h2>
                </div>
                <Tag color="blue" className="text-lg px-4 py-1 rounded">
                {couponDetail.code}
                </Tag>
            </div>

            <Divider />

            {/* Nội dung */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Cột trái */}
                <Card size="small" title="📌 Thông tin phiếu giảm giá" bordered={false}>
                <p>
                    <span className="font-medium">Mô tả:</span>{" "}
                    {couponDetail.description || "-"}
                </p>
                <p>
                    <span className="font-medium">Loại:</span>{" "}
                    {renderCouponType(
                    couponDetail.type,
                    couponDetail.value,
                    couponDetail.maxDiscount
                    )}
                </p>
                </Card>

                {/* Cột phải */}
                <Card size="small" title="⏳ Thời gian áp dụng" bordered={false}>
                <p>
                    <span className="font-medium">Bắt đầu:</span>{" "}
                    {couponDetail.startDate
                    ? new Date(couponDetail.startDate).toLocaleDateString("vi-VN")
                    : "-"}
                </p>
                <p>
                    <span className="font-medium">Kết thúc:</span>{" "}
                    {couponDetail.endDate
                    ? new Date(couponDetail.endDate).toLocaleDateString("vi-VN")
                    : "-"}
                </p>
                </Card>
            </div>
            </div>
        )}
        </Modal>
    );
};

export default CouponDetailModal;
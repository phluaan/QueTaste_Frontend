import { useEffect, useState } from "react";
import { CheckCircle, Clock, Truck, MapPin, Package } from "lucide-react";

export default function OrderTrackingList() {
  const [driverPos, setDriverPos] = useState([10.7769, 106.7009]);
  const customerPos = [10.7626, 106.6822];
  const [progress, setProgress] = useState(0); // 0–100 %

  // Mô phỏng shipper di chuyển, cập nhật % hoàn thành
  useEffect(() => {
    const totalDistance = Math.sqrt(
      Math.pow(customerPos[0] - driverPos[0], 2) +
        Math.pow(customerPos[1] - driverPos[1], 2)
    );
    let distance = totalDistance;

    const interval = setInterval(() => {
      setDriverPos(([lat, lng]) => {
        const [targetLat, targetLng] = customerPos;
        const step = 0.0005;
        const dirLat = targetLat > lat ? step : -step;
        const dirLng = targetLng > lng ? step : -step;
        const newLat = lat + dirLat;
        const newLng = lng + dirLng;

        // tính % hoàn thành
        distance = Math.sqrt(
          Math.pow(customerPos[0] - newLat, 2) +
            Math.pow(customerPos[1] - newLng, 2)
        );
        const percent = Math.max(0, 100 - (distance / totalDistance) * 100);
        setProgress(percent);

        return [newLat, newLng];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Các mốc trạng thái
  const steps = [
    {
      id: 1,
      label: "Đã xác nhận đơn hàng",
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
      time: "14:00 hôm nay",
    },
    {
      id: 2,
      label: "Đang chuẩn bị hàng",
      icon: <Package className="text-yellow-500 w-5 h-5" />,
      time: "14:10 hôm nay",
    },
    {
      id: 3,
      label: "Đang giao hàng",
      icon: <Truck className="text-blue-500 w-5 h-5" />,
      time: "14:30 hôm nay",
    },
    {
      id: 4,
      label: "Đang đến gần địa chỉ giao",
      icon: <MapPin className="text-purple-500 w-5 h-5" />,
      time: "15:00 hôm nay",
    },
    {
      id: 5,
      label: "Giao hàng thành công",
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      time: "15:30 hôm nay",
    },
  ];

  // Xác định trạng thái hiện tại theo % progress
  const currentStepIndex =
    progress < 20
      ? 0
      : progress < 40
      ? 1
      : progress < 70
      ? 2
      : progress < 99
      ? 3
      : 4;

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-5 rounded-2xl shadow">
        <h1 className="text-xl font-bold mb-2">
          🚚 Theo dõi đơn hàng #ORD12345
        </h1>
        <p className="text-gray-600">
          Trạng thái:{" "}
          <span className="font-semibold text-blue-600">
            {steps[currentStepIndex].label}
          </span>
        </p>
        <p className="text-gray-600">Người giao: Nguyễn Văn A</p>
        <p className="text-gray-600 mb-4">
          Dự kiến giao: <span className="font-semibold">15:30 hôm nay</span>
        </p>

        {/* Thanh tiến trình */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Danh sách trạng thái */}
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex items-center space-x-3 ${
                index <= currentStepIndex ? "opacity-100" : "opacity-40"
              }`}
            >
              <div
                className={`${
                  index <= currentStepIndex ? "bg-blue-100" : "bg-gray-100"
                } p-2 rounded-full`}
              >
                {step.icon}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    index <= currentStepIndex
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-sm text-gray-400">{step.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-400">
        Cập nhật vị trí mỗi 2 giây (mô phỏng)
      </div>
    </div>
  );
}

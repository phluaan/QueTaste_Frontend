import { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    avatar: "https://i.pravatar.cc/150?img=12",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  });
setUser();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl">
      <div className="flex items-center space-x-6 mb-6">
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border" />
        <div>
          <h2 className="text-2xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">Số điện thoại:</span> {user.phone}</p>
        <p><span className="font-semibold">Địa chỉ:</span> {user.address}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

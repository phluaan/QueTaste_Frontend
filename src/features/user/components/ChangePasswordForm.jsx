import { useState } from "react";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit đổi mật khẩu:", formData);
    // Gọi API đổi mật khẩu ở đây
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>

      <div>
        <label className="block text-sm font-medium">Mật khẩu cũ</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Mật khẩu mới</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="reset"
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-500"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;

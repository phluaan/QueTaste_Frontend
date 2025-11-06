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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-que-text-main">
        Đổi mật khẩu
      </h2>

      <div>
        <label className="block text-sm font-medium text-que-text-sub">
          Mật khẩu cũ
        </label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-que-text-sub">
          Mật khẩu mới
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-que-text-sub">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
        />
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="reset"
          className="px-4 py-2 rounded-lg bg-que-secondary text-que-text-main hover:bg-que-border transition"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-que-primary text-white font-semibold hover:bg-que-primary/90 transition"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;

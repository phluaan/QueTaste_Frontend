import { useState } from "react";
import useProfile from "../hooks/useProfile";
import { FiCamera } from "react-icons/fi";

const ProfileForm = () => {
  const { user, handleChange, handleSubmit, handleSubmitWithValidation, validateForm, formData, setFormData, previewAvatar, setPreviewAvatar, errors, setErrors } = useProfile();
  

  if (!user) return <p>Đang tải...</p>;

  return (
    <form onSubmit={handleSubmitWithValidation} className="bg-white p-6 rounded-2xl max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-24 h-24">
          <img
            src={previewAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
            <FiCamera className="w-4 h-4" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {errors.avatarFile && <p className="text-red-500 text-sm mt-1">{errors.avatarFile}</p>}
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none"
            />
          </h2>
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Giới tính</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => {
            setFormData({
              fullName: user.fullName,
              phone: user.phone,
              address: user.address,
              dateOfBirth: user.dateOfBirth,
              gender: user.gender,
              avatarFile: user.avatar || null,
            });
            setPreviewAvatar(user.avatar || "/default-avatar.png");
            setErrors({});
          }}
          className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
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

export default ProfileForm;

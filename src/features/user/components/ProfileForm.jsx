import { useEffect } from "react";
import useProfile from "../hooks/useProfile";
import { FiCamera } from "react-icons/fi";
import useVietnamProvinces from "../../checkout/hooks/useVietnamProvinces";

const ProfileForm = () => {
  const {
    user,
    handleChange,
    handleCancel,
    handleSubmitWithValidation,
    formData,
    setFormData,
    previewAvatar,
    errors,
  } = useProfile();

  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useVietnamProvinces();

  useEffect(() => {
    const provinceCode = formData.personalInfo?.shippingAddress?.province;
    const districtCode = formData.personalInfo?.shippingAddress?.district;

    if (provinceCode) {
      fetchDistricts(Number(provinceCode)).then(() => {
        if (districtCode) {
          fetchWards(Number(districtCode));
        }
      });
    }
  }, [
    formData.personalInfo?.shippingAddress?.province,
    formData.personalInfo?.shippingAddress?.district,
  ]);

  if (!user) return <p>Đang tải...</p>;

  return (
    <form
      onSubmit={handleSubmitWithValidation}
      className="bg-white p-6 rounded-2xl max-w-3xl mx-auto shadow"
    >
      {/* Header */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-24 h-24">
          <img
            src={previewAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-que-primary text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-que-primary/90">
            <FiCamera className="w-4 h-4" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {errors.avatarFile && (
            <p className="text-red-500 text-sm mt-1">{errors.avatarFile}</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="border-b border-que-border focus:outline-none focus:border-que-primary"
            />
          </h2>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-que-text-sub">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Province – District – Ward */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            name="province"
            value={formData.personalInfo.shippingAddress?.province || ""}
            onChange={(e) => {
              const code = Number(e.target.value);
              setFormData((prev) => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  shippingAddress: {
                    ...prev.personalInfo.shippingAddress,
                    province: code,
                    district: null,
                    ward: null,
                    postalCode: code,
                  },
                },
              }));
              fetchDistricts(code);
            }}
            className="w-full border border-que-border p-3 rounded-lg focus:ring focus:ring-que-primary/30 focus:border-que-primary"
            required
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={formData.personalInfo.shippingAddress?.district || ""}
            onChange={(e) => {
              const code = Number(e.target.value);
              setFormData((prev) => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  shippingAddress: {
                    ...prev.personalInfo.shippingAddress,
                    district: code,
                    ward: null,
                  },
                },
              }));
              fetchWards(code);
            }}
            disabled={!formData.personalInfo.shippingAddress?.province}
            className="w-full border border-que-border p-3 rounded-lg focus:ring focus:ring-que-primary/30 focus:border-que-primary"
            required
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            name="ward"
            value={formData.personalInfo.shippingAddress?.ward || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  shippingAddress: {
                    ...prev.personalInfo.shippingAddress,
                    ward: Number(e.target.value),
                  },
                },
              }))
            }
            disabled={!formData.personalInfo.shippingAddress?.district}
            className="w-full border border-que-border p-3 rounded-lg focus:ring focus:ring-que-primary/30 focus:border-que-primary"
            required
          >
            <option value="">Chọn Xã/Phường</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Street */}
        <input
          type="text"
          name="street"
          placeholder="Địa chỉ (Số nhà, tên đường...)"
          value={formData.personalInfo.shippingAddress?.street || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                shippingAddress: {
                  ...prev.personalInfo.shippingAddress,
                  street: e.target.value,
                },
              },
            }))
          }
          className="w-full border border-que-border p-3 rounded-lg mt-4 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-que-text-sub">
              Ngày sinh
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.personalInfo?.dateOfBirth?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-que-text-sub">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.personalInfo?.gender || ""}
              onChange={handleChange}
              className="w-full border border-que-border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-que-primary/30 focus:border-que-primary"
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={handleCancel}
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

export default ProfileForm;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../slices/userSlice";
import defaultAvatar from "../../../assets/defaultAvatar.jpg";
import useVietnamProvinces from "../../checkout/hooks/useVietnamProvinces";

const useProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState(
    user?.avatar || defaultAvatar
  );

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: user?.personalInfo?.fullName || "",
    email: user?.email || "",
    phone: user?.personalInfo?.phone || "",
    personalInfo: {
      shippingAddress: {
        province: user?.personalInfo?.shippingAddress?.province || "",
        district: user?.personalInfo?.shippingAddress?.district || "",
        ward: user?.personalInfo?.shippingAddress?.ward || "",
        street: user?.personalInfo?.shippingAddress?.street || "",
        postalCode: user?.personalInfo?.shippingAddress?.postalCode || "",
      },
      dateOfBirth: user?.personalInfo?.dateOfBirth || "",
      gender: user?.personalInfo?.gender || "",
    },
    avatarFile: user?.avatar || null,
  });

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.personalInfo?.fullName || "",
        email: user.email || "",
        phone: user.personalInfo?.phone || "",
        personalInfo: {
          shippingAddress: {
            province: user.personalInfo?.shippingAddress?.province || "",
            district: user.personalInfo?.shippingAddress?.district || "",
            ward: user.personalInfo?.shippingAddress?.ward || "",
            street: user.personalInfo?.shippingAddress?.street || "",
            postalCode: user.personalInfo?.shippingAddress?.postalCode || "",
          },
          dateOfBirth: user.personalInfo?.dateOfBirth || "",
          gender: user.personalInfo?.gender || "",
        },
        avatarFile: user.avatar || null,
      });
      setPreviewAvatar(user.avatar || defaultAvatar);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files?.[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatarFile: file }));
      setPreviewAvatar(URL.createObjectURL(file));
      return;
    }

    if (
      ["province", "district", "ward", "street", "postalCode"].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          shippingAddress: {
            ...prev.personalInfo.shippingAddress,
            [name]: value,
          },
        },
      }));
      return;
    }

    if (["gender", "dateOfBirth"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [name]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (!user) return;

    setFormData({
      fullName: user.personalInfo?.fullName || "",
      email: user.email || "",
      phone: user.personalInfo?.phone || "",
      personalInfo: {
        shippingAddress: {
          province: user.personalInfo?.shippingAddress?.province || "",
          district: user.personalInfo?.shippingAddress?.district || "",
          ward: user.personalInfo?.shippingAddress?.ward || "",
          street: user.personalInfo?.shippingAddress?.street || "",
          postalCode: user.personalInfo?.shippingAddress?.postalCode || "",
        },
        dateOfBirth: user.personalInfo?.dateOfBirth || "",
        gender: user.personalInfo?.gender || "",
      },
      avatarFile: user.avatar || null,
    });

    setPreviewAvatar(user.avatar || defaultAvatar);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      formPayload.append("phone", formData.phone);
      formPayload.append("gender", formData.personalInfo.gender);
      formPayload.append("dateOfBirth", formData.personalInfo.dateOfBirth);
      formPayload.append(
        "shippingAddress",
        JSON.stringify(formData.personalInfo.shippingAddress)
      );

      if (formData.avatarFile instanceof File) {
        formPayload.append("avatar", formData.avatarFile);
      }

      await dispatch(updateProfile(formPayload));
      if (accessToken) {
        await dispatch(getProfile(accessToken));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Hàm validate form
  const validateForm = () => {
    const newErrors = {};

    // fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    // phone
    if (formData.phone && !/^\d{9,15}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // dateOfBirth
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        newErrors.dateOfBirth = "Ngày sinh không được lớn hơn hôm nay";
      }
    }

    // gender
    if (formData.gender && !["male", "female"].includes(formData.gender)) {
      newErrors.gender = "Giới tính không hợp lệ";
    }

    // avatarFile (nếu là file)
    if (formData.avatarFile instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(formData.avatarFile.type)) {
        newErrors.avatarFile = "Chỉ cho phép file ảnh (jpeg, png, gif)";
      }
      const maxSizeMB = 5;
      if (formData.avatarFile.size / 1024 / 1024 > maxSizeMB) {
        newErrors.avatarFile = `Kích thước tối đa ${maxSizeMB}MB`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit với validation
  const handleSubmitWithValidation = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true); // bật loading
      await handleSubmit(e);
    } finally {
      setIsLoading(false); // tắt loading khi xong
    }
  };

  return {
    user,
    formData,
    handleChange,
    handleCancel,
    handleSubmit,
    validateForm,
    handleSubmitWithValidation,
    previewAvatar,
    errors,
    setErrors,
    setFormData,
    setPreviewAvatar,
    isLoading,
  };
};

export default useProfile;

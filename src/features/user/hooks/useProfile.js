import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../slices/userSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.auth);

  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || "/default-avatar.png");

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    avatarFile:  user?.avatar || null,
  });


  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [accessToken, dispatch]);

useEffect(() => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      fullName: user.personalInfo.fullName || "",
      phone: user.personalInfo.phone || "",
      address: user.personalInfo.address || "",
      dateOfBirth: user.personalInfo.dateOfBirth || "",
      gender: user.personalInfo.gender || "",
      avatarFile: user.avatar || null,
    }));
    setPreviewAvatar(user.avatar || "/default-avatar.png");
  }
}, [user]);


const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "avatar" && files?.[0]) {
    // Khi chọn avatar
    const file = files[0];
    setFormData((prev) => ({ ...prev, avatarFile: file }));
    setPreviewAvatar(URL.createObjectURL(file));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleCancel = (e) => {
  e.preventDefault();
  if (!user) return;

  setFormData({
    fullName: user.personalInfo?.fullName || "",
    email: user.email || "",
    phone: user.personalInfo?.phone || "",
    address: user.personalInfo?.address || "",
    dateOfBirth: user.personalInfo?.dateOfBirth || "",
    gender: user.personalInfo?.gender || "",
    avatarFile: user.avatar || null,
  });

  setPreviewAvatar(user.avatar || "/default-avatar.png");
  setErrors({});
};


const handleSubmit = (e) => {
  e.preventDefault();

  try {
    const formPayload = new FormData();

    for (const key in formData) {
      if (key !== "avatarFile" && formData[key] !== null && formData[key] !== undefined) {
        formPayload.append(key, formData[key]);
      }
    }

    if (formData.avatarFile instanceof File) {
      formPayload.append("avatar", formData.avatarFile);
    }
    dispatch(updateProfile(formPayload));
    // Sau khi update xong, fetch lại profile
    if (accessToken) {
      dispatch(getProfile(accessToken));
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
  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e); // gọi handleSubmit từ hook useProfile
    }
  };



return { user, formData, handleChange, handleCancel, handleSubmit,validateForm, handleSubmitWithValidation, previewAvatar, errors, setErrors, setFormData, setPreviewAvatar };
};

export default useProfile;

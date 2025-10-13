const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

const validateRequired = (field, value, minLength = 0) => {
  if (!value || !String(value).trim()) return `${field} is required`;
  if (minLength > 0 && String(value).trim().length < minLength) {
    return `${field} must be at least ${minLength} characters`;
  }
  return "";
};

const hasSpecialChars = (value) => /[^a-zA-ZÀ-ỹ\s]/.test(String(value || ""));

export const validateNoSpecialChars = (field, value) => {
  if (!value) return "";
  if (hasSpecialChars(value)) return `${field} cannot contain numbers or special characters`;
  return "";
};

const hasWhitespace = (value) => /\s/.test(String(value || ""));

const isSixDigits = (value) => /^\d{6}$/.test(String(value || "").trim());


export const validateLogin = ({ email, password }) => {
  const errors = {};

  const emailError = validateRequired("Email", email);
  if (emailError) errors.email = emailError;
  else if (!isEmailValid(email)) errors.email = "Invalid email format";

  const passwordError = validateRequired("Password", password, 6);
  if (passwordError) errors.password = passwordError;
  else if (hasWhitespace(password)) errors.password = "Password cannot contain spaces";

  return errors;
};


export const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = {};

  const nameRequired = validateRequired("Name", name, 2);
  if (nameRequired) errors.name = nameRequired;
  else {
    const nameSafe = validateNoSpecialChars("Name", name);
    if (nameSafe) errors.name = nameSafe;
  }

  const emailError = validateRequired("Email", email);
  if (emailError) errors.email = emailError;
  else if (!isEmailValid(email)) errors.email = "Invalid email format";

  const passwordError = validateRequired("Password", password, 6);
  if (passwordError) errors.password = passwordError;
  else if (hasWhitespace(password)) errors.password = "Password cannot contain spaces";

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};


export const validateEmail = (email) => {
  if (!email) return { email: "Email là bắt buộc" };
  if (!isEmailValid(email)) return { email: "Email không hợp lệ" };
  return {};
};


export const validateResetPassword = (newPassword) => {
  if (!newPassword) return { newPassword: "Mật khẩu mới là bắt buộc" };
  if (newPassword.length < 6)
    return { newPassword: "Mật khẩu phải dài ít nhất 6 ký tự" };
  if (hasWhitespace(newPassword))
    return { newPassword: "Mật khẩu không được chứa khoảng trắng" };
  return {};
};


export const validateOTP = (otp) => {
  if (!otp) return { otp: "OTP là bắt buộc" };
  if (!isSixDigits(otp)) return { otp: "OTP phải là 6 chữ số" };
  return {};
};

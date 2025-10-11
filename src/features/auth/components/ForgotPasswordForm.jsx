import React from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import InputField from "../../../components/InputField";
import ButtonCustom from "../../../components/ButtonCustom";
import LinkCustom from "../../../components/LinkCustom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPasswordForm = () => {
  const { email, setEmail, loading, error, handleSubmit } = useForgotPassword();

  return (
    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        icon={FaEnvelope}
        required
      />

      {error && <p className="text-sm text-que-danger text-center">{error}</p>}

      <ButtonCustom type="submit" loading={loading}>
        Đặt lại mật khẩu
      </ButtonCustom>

      <p className="text-center text-sm mt-4 text-que-text-muted">
        Quay lại <LinkCustom to="/login">Đăng nhập</LinkCustom>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;

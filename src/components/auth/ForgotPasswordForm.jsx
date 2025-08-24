import React from "react";
import InputField from "../InputField";
import ButtonCustom from "../ButtonCustom";
import LinkCustom from "../LinkCustom";
import { FaEnvelope } from "react-icons/fa";
import useForgotPassword from "../../hooks/useForgotPassword";

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
        placeholder="Enter your email"
        icon={FaEnvelope}
        required
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <ButtonCustom type="submit" loading={loading}>
        Reset Password
      </ButtonCustom>

      <p className="text-center text-sm mt-4">
        Back to{" "}
        <LinkCustom to="/login">
          Login
        </LinkCustom>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;

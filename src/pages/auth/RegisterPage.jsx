import AuthLayout from "../../layouts/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      subtitle="">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;

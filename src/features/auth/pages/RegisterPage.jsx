import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

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

import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="h-screen bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#07689F] mb-2">
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Form hoặc nội dung sẽ truyền vào đây */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="h-screen bg-que-background flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-que-background">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-que-primary mb-2">
            {title}
          </h2>
          <p className="text-que-text-muted">{subtitle}</p>
        </div>

        {/* Form hoặc nội dung sẽ truyền vào đây */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

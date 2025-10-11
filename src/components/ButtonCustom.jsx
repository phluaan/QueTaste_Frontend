import React from "react";
import { FaSpinner } from "react-icons/fa";

const ButtonCustom = ({ type = "button", loading, children, ...props }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="group relative w-full flex justify-center py-3 px-4 
        border border-transparent text-sm font-semibold rounded-xl 
        text-white bg-que-primary hover:bg-que-accent 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-que-primary 
        transform transition-all duration-150 hover:scale-[1.02] 
        disabled:opacity-50 disabled:cursor-not-allowed 
        disabled:hover:scale-100 disabled:hover:bg-que-primary"
      {...props}
    >
      {loading ? <FaSpinner className="animate-spin h-5 w-5" /> : children}
    </button>
  );
};

export default ButtonCustom;

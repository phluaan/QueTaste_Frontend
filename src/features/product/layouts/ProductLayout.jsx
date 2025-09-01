import React from "react";
import Header from "../../../components/Header/Header";

const ProductLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        {/* Header cố định */}
        <Header />

        <div className="flex flex-1 mt-500">

            {/* Content */}
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
        </div>
    );
};

export default ProductLayout;

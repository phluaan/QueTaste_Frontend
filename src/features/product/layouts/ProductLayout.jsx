import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

const ProductLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        {/* Header cố định */}
        <Header />

        {/* Sidebar + Content */}
        <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
        </div>
    );
};

export default ProductLayout;

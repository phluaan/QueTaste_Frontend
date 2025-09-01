import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        {/* Header luôn cố định trên cùng */}
        <Header />

        <div className="flex flex-1">

            {/* Nội dung chính */}
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
        </div>
    );
};

export default MainLayout;

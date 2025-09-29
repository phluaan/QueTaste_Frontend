import Header from "../components/Header/Header";
import ChatWidget from "../features/chat/components/ChatWidget";
const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        {/* Header luôn cố định trên cùng */}
        <Header />

        <div className="flex flex-1">

            {/* Nội dung chính */}
            <main className="flex-1 bg-gray-50">{children}</main>
            <ChatWidget />
        </div>
        </div>
    );
};

export default MainLayout;

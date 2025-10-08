import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import ChatWidget from "../features/chat/components/ChatWidget";
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn cố định trên cùng */}
      <Header />

      <div className="flex flex-1">
        {/* Nội dung chính */}
        <main className="flex-1 bg-gray-50 pt-16">{children}</main>
        <ChatWidget />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

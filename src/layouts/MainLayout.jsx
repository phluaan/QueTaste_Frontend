import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import ChatWidget from "../features/chat/components/ChatWidget";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
};

export default MainLayout;

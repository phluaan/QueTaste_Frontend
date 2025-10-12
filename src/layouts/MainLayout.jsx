import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import ChatWidget from "../features/chat/components/ChatWidget";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Chat widget */}
      <ChatWidget />
    </div>
  );
};

export default MainLayout;

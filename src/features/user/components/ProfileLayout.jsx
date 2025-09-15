import Footer from "../../../components/Footer";
import Header from "../../../components/Header/Header";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col mt-16">
      {/* Header */}
      <header className="w-full">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="flex-1 flex justify-center items-start p-4">
        <div className="flex bg-white shadow-lg rounded-xl w-full p-6 gap-4">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileLayout;

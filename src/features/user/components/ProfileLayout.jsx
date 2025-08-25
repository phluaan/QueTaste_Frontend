import Header from "../../../components/Header/Header";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md max-w-5xl w-full flex">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;

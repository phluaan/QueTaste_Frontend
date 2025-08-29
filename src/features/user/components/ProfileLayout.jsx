import Header from "../../../components/Header/Header";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="flex-1 flex">
        <div className="flex w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;

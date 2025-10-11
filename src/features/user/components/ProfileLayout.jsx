import Footer from "../../../components/Footer";
import Header from "../../../components/Header/Header";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-que-background flex flex-col">
      {/* Nội dung chính */}
      <main className="flex-1 flex justify-center items-start p-6 ">
        <div className="flex bg-que-surface border border-que-border shadow-lg rounded-xl w-full p-6 gap-6 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;

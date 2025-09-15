const SidebarButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
        isActive ? "bg-blue-400 text-white" : "hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default SidebarButton;

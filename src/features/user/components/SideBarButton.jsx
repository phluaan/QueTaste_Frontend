const SidebarButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 rounded-lg transition font-medium
        ${
          isActive
            ? "bg-que-primary text-white shadow-sm"
            : "text-que-text-main hover:bg-que-background hover:text-que-primary"
        }`}
    >
      {label}
    </button>
  );
};

export default SidebarButton;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiUser, FiSettings, FiLock } from "react-icons/fi";

export default function AdminMenu({ avatar, name = "Admin", onLogout }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!open) return;
      if (
        popRef.current &&
        !popRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 focus:outline-none rounded-full pr-2 pl-1 py-1 hover:bg-que-secondary/20 transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img
          src={avatar}
          alt="admin avatar"
          className="w-8 h-8 rounded-full border object-cover"
        />
        <span className="hidden sm:block text-que-text-main text-sm font-medium">
          {name}
        </span>
        <FiChevronDown className="text-que-text-muted" />
      </button>

      {open && (
        <div
          ref={popRef}
          role="menu"
          className="absolute right-0 mt-2 w-56 bg-que-surface border border-que-secondary/20 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {/* Header user info */}
          <div className="p-3 bg-que-background">
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="admin avatar"
                className="w-10 h-10 rounded-full border object-cover"
              />
              <div className="min-w-0">
                <div className="font-semibold text-que-text-main truncate">
                  {name}
                </div>
                <div className="text-xs text-que-text-muted truncate">
                  Admin dashboard
                </div>
              </div>
            </div>
          </div>



          <div className="h-px bg-que-secondary/20" />

          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout?.();
            }}
            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-que-background text-que-danger transition-colors"
          >
            <FiLogOut className="shrink-0" />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
}

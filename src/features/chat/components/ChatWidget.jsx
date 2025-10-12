import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useChatSocket } from "../hooks/useChatSocket";
import { getAccessToken } from "../../../utils/storage";
import { useSelector } from "react-redux";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const { unreadCounts } = useSelector((s) => s.chat);
  useChatSocket(open);

  const token = getAccessToken(); 
  if (!token) return null; 
  const totalUnread = Object.values(unreadCounts || {}).reduce((a, b) => a + b, 0);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-que-primary text-white p-3 rounded-full shadow-lg hover:bg-que-secondary transition-colors"
      >
        <MessageCircle size={28} />
        {totalUnread > 0 && (
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-[700px] h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden flex border border-que-background">
          <div className="w-1/3 border-r border-que-background">
            <ChatSidebar />
          </div>
          <div className="flex-1">
            <ChatWindow />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

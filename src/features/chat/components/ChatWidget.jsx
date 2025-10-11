import { useState } from "react";
import { MessageCircle } from "lucide-react"; // icon
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useChatSocket } from "../hooks/useChatSocket";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  useChatSocket();

  return (
    <>
      {/* Icon ở góc phải */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-que-primary text-white p-3 rounded-full shadow-lg hover:bg-que-secondary transition-colors"
      >
        <MessageCircle size={28} />
      </button>

      {/* Popup chat */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[700px] h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden flex border border-que-background">
          {/* Sidebar: danh sách hội thoại */}
          <div className="w-1/3 border-r border-que-background">
            <ChatSidebar />
          </div>

          {/* Chat window: nội dung hội thoại */}
          <div className="flex-1">
            <ChatWindow />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

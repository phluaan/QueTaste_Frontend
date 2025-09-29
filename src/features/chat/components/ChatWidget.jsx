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
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        <MessageCircle size={28} />
      </button>

      {/* Popup chat */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[700px] h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden flex border">
          {/* Sidebar: danh sách hội thoại */}
          <div className="w-1/3 border-r">
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

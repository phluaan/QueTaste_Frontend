import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { sendMessage, fetchMessages } from "../slices/chatSlice";
import MessageItem from "./MessageItem";
import { getUser } from "../../../utils/storage";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((s) => s.chat);

  const authUser = useSelector((s) => s.auth.user) || getUser();
  const userId = authUser?._id?.toString();

  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const listRef = useRef(null);           // khung scroll
  const bottomAnchorRef = useRef(null);   // anchor kéo xuống cuối
  const loadingMoreRef = useRef(false);   // cờ để phân biệt đang prepend hay nhận/gửi mới

  // Lấy mảng tin nhắn (newest-first trong state)
  const convMessages = activeConversation
    ? (messages[activeConversation._id] || [])
    : [];

  // Người còn lại
  const other = activeConversation?.participants.find(
    (p) => p.user?._id?.toString() !== userId
  );
  const otherUser = other?.user;

  const handleSend = () => {
    if (!text.trim() || !otherUser?._id) return;
    dispatch(
      sendMessage({
        receiverId: otherUser._id,
        content: text.trim(),
      })
    );
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Load trang 1 khi đổi hội thoại
  useEffect(() => {
    if (!activeConversation?._id) return;
    setPage(1);
    setHasMore(true);
    loadingMoreRef.current = false;

    console.log("🔁 Load page 1 for conv:", activeConversation._id);
    dispatch(fetchMessages({ conversationId: activeConversation._id, page: 1 }));
  }, [activeConversation, dispatch]);

  // Auto scroll xuống đáy:
  // - Khi KHÔNG phải đang prepend (loadingMoreRef = false)
  // - Hoặc khi đổi hội thoại
  useEffect(() => {
    if (!activeConversation?._id) return;

    if (!loadingMoreRef.current && bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("⬇️ Auto scroll to bottom");
    }
  }, [convMessages, activeConversation]);

  // Lazy-load: kéo lên đầu để lấy trang tiếp theo (older)
  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (!el || !hasMore || loadingMoreRef.current) return;

    if (el.scrollTop <= 0) {
      const nextPage = page + 1;
      const prevHeight = el.scrollHeight;
      loadingMoreRef.current = true;

      console.log("⬆️ Load more...", {
        convId: activeConversation._id,
        nextPage,
        prevHeight,
        currentLen: convMessages.length,
      });

      dispatch(fetchMessages({
        conversationId: activeConversation._id,
        page: nextPage,
      })).then((res) => {
        const count = res?.payload?.data?.length || 0;
        console.log("⬆️ Loaded page", nextPage, "items:", count);

        if (count === 0) {
          setHasMore(false);
          loadingMoreRef.current = false;
          return;
        }

        setPage(nextPage);

        // Sau khi state cập nhật (render xong), giữ nguyên vị trí scroll
        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight;
          el.scrollTop = newHeight - prevHeight;
          console.log("🧲 Restore scrollTop:", {
            prevHeight, newHeight, scrollTop: el.scrollTop,
          });
          loadingMoreRef.current = false;
        });
      });
    }
  };

  if (!activeConversation) {
    return <div className="p-4">Chọn hội thoại để bắt đầu chat</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header: tên người đang chat */}
      <div className="p-3 border-b font-semibold bg-gray-100">
        {otherUser?.personalInfo?.fullName || "Người dùng"}
      </div>

      {/* Nội dung tin nhắn */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-2 bg-gray-50"
      >
        {convMessages
          .slice()        // copy
          .reverse()      // hiển thị cũ -> mới
          .map((msg) => (
            <MessageItem key={msg._id} msg={msg} userId={userId} />
          ))}

        {/* anchor để cuộn xuống cuối */}
        <div ref={bottomAnchorRef} />
      </div>

      {/* Ô nhập */}
      <div className="p-2 flex gap-2">
        <textarea
          rows={1}
          className="flex-1 border rounded p-2 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

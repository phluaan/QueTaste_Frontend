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

  const listRef = useRef(null);
  const bottomAnchorRef = useRef(null);
  const loadingMoreRef = useRef(false);

  const convMessages = activeConversation
    ? messages[activeConversation._id] || []
    : [];

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

  useEffect(() => {
    if (!activeConversation?._id) return;
    setPage(1);
    setHasMore(true);
    loadingMoreRef.current = false;

    dispatch(
      fetchMessages({ conversationId: activeConversation._id, page: 1 })
    );
  }, [activeConversation, dispatch]);

  useEffect(() => {
    if (!activeConversation?._id) return;
    if (!loadingMoreRef.current && bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [convMessages, activeConversation]);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (!el || !hasMore || loadingMoreRef.current) return;

    if (el.scrollTop <= 0) {
      const nextPage = page + 1;
      const prevHeight = el.scrollHeight;
      loadingMoreRef.current = true;

      dispatch(
        fetchMessages({
          conversationId: activeConversation._id,
          page: nextPage,
        })
      ).then((res) => {
        const count = res?.payload?.data?.length || 0;
        if (count === 0) {
          setHasMore(false);
          loadingMoreRef.current = false;
          return;
        }

        setPage(nextPage);

        requestAnimationFrame(() => {
          const newHeight = el.scrollHeight;
          el.scrollTop = newHeight - prevHeight;
          loadingMoreRef.current = false;
        });
      });
    }
  };

  if (!activeConversation) {
    return (
      <div className="p-4 text-gray-600">Chọn hội thoại để bắt đầu chat</div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b bg-que-background text-que-primary font-semibold">
        {otherUser?.personalInfo?.fullName || "Người dùng"}
      </div>

      {/* Message list */}
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-3 bg-que-surface"
      >
        {convMessages
          .slice()
          .reverse()
          .map((msg) => (
            <MessageItem key={msg._id} msg={msg} userId={userId} />
          ))}

        <div ref={bottomAnchorRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t bg-que-background">
        <textarea
          rows={1}
          className="flex-1 border border-que-primary rounded-lg p-2 resize-none focus:ring-2 focus:ring-que-accent focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={handleSend}
          className="bg-que-primary hover:bg-que-secondary text-white px-4 rounded-lg transition-colors"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

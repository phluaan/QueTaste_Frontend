import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchConversations, setActiveConversation, fetchMessages } from "../slices/chatSlice";
import { searchUsers } from "../../user/slices/userSlice";
import { getUser } from "../../../utils/storage"; // 
import defaultAvatar from "../../../assets/defaultAvatar.jpg";

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { conversations, activeConversation, presence, unreadCounts } = useSelector((s) => s.chat);
  const { searchResults, loading: searchLoading } = useSelector((s) => s.user);

  const authUser = useSelector((s) => s.auth.user) || getUser();
  const userId = authUser?._id?.toString();

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim()) {
      dispatch(searchUsers({ keyword: search, role: "user" }));
    }
  }, [search, dispatch]);

  const filteredConversations = conversations.filter((c) =>
    c.participants.some((p) => p.user?._id?.toString() !== userId)
  );

  return (
    <div className="h-full flex flex-col">
      {/* Ô tìm kiếm */}
      <div className="p-2 border-b">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded p-2 text-sm"
          placeholder="Tìm theo tên..."
        />
      </div>

      {/* Danh sách hội thoại hoặc kết quả tìm kiếm */}
      <div className="flex-1 overflow-y-auto">
        {search.trim() ? (
          searchLoading ? (
            <p className="p-3 text-gray-500">Đang tìm kiếm...</p>
          ) : searchResults.length === 0 ? (
            <p className="p-3 text-gray-500">Không tìm thấy người dùng</p>
          ) : (
            searchResults
            .filter((u) => u._id.toString() !== userId)
            .map((u) => (
              <div
                key={u._id}
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  const existingConv = conversations.find((conv) =>
                    conv.participants.some((p) => p.user?._id?.toString() === u._id.toString())
                  );

                  if (existingConv) {
                    dispatch(setActiveConversation(existingConv));
                    dispatch(fetchMessages({ conversationId: existingConv._id, page: 1, limit: 10 }));
                  } else {
                    dispatch(
                      setActiveConversation({
                        _id: `new-${u._id}`,
                        participants: [
                          {
                            user: {
                              _id: u._id,
                              personalInfo: { fullName: u.personalInfo.fullName },
                              avatar: u.avatar || defaultAvatar,
                              role: u.role,
                            },
                          },
                          {
                            user: { _id: userId },
                          },
                        ],
                      })
                    );
                  }

                  setSearch("");
                }}


              >
                <div className="flex items-center gap-2">
                  <img
                    src={u.avatar || defaultAvatar}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{u.personalInfo?.fullName || "Người dùng"}</span>
                  {u.role === "admin" && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-100 text-red-600">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          filteredConversations.map((c) => {
            const other = c.participants.find((p) => p.user?._id?.toString() !== userId);
            if (!other) return null;
            const unread = unreadCounts[c._id] || 0;
            const otherUser = other.user;
            const isOnline = presence[otherUser._id]?.status === "online";

            return (
              <div
                key={c._id}
                className={`p-3 cursor-pointer hover:bg-gray-100 ${
                  activeConversation?._id === c._id ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                    dispatch(setActiveConversation(c));
                    dispatch(fetchMessages({ conversationId: c._id, page: 1, limit: 10 }));
                    }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={otherUser.avatar || defaultAvatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{otherUser.personalInfo?.fullName || "Người dùng"}</span>
                    {otherUser.role === "admin" && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-100 text-red-600">
                        Admin
                      </span>
                    )}
                    {unread > 0 && <span className="w-3 h-3 bg-red-500 rounded-full"></span>}
                  </div>
                  {isOnline && <span className="text-green-500 text-xs">●</span>}
                </div>
                <small className="text-gray-500">
                  {c.lastMessageAt
                    ? new Date(c.lastMessageAt).toLocaleTimeString()
                    : "Chưa có tin nhắn"}
                </small>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
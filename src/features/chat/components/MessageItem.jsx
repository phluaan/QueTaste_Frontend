const MessageItem = ({ msg, userId }) => {
  const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const isMine = senderId?.toString() === userId?.toString();

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-2 rounded-lg max-w-xs break-words ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {msg.type === "text" && <span>{msg.content}</span>}
        {msg.type === "image" && (
          <img src={msg.content} alt="img" className="max-h-40 rounded" />
        )}
        {msg.type === "file" && (
          <a
            href={msg.content}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            📎 File
          </a>
        )}
      </div>
    </div>
  );
};


export default MessageItem;

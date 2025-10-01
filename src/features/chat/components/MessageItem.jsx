const MessageItem = ({ msg, userId }) => {
  const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const isMine = senderId?.toString() === userId?.toString();

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-3 rounded-2xl max-w-xs break-words shadow-sm ${
          isMine
            ? "bg-que-primary text-white"
            : "bg-que-background text-que-text-main"
        }`}
      >
        {msg.type === "text" && <span>{msg.content}</span>}

        {msg.type === "image" && (
          <img
            src={msg.content}
            alt="img"
            className="max-h-40 rounded-lg border border-que-secondary/30"
          />
        )}

        {msg.type === "file" && (
          <a
            href={msg.content}
            target="_blank"
            rel="noreferrer"
            className={`underline ${
              isMine ? "text-white" : "text-que-primary"
            }`}
          >
            📎 File
          </a>
        )}
      </div>
    </div>
  );
};

export default MessageItem;

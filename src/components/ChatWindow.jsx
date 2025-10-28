import { useEffect, useRef } from "react";

function Bubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed shadow ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-neutral-800/70 text-neutral-100 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default function ChatWindow({ messages, loading }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-neutral-400 text-center py-10">
            Start the conversation by asking a question.
          </div>
        )}
        {messages.map((m) => (
          <Bubble key={m.id + m.created_at || Math.random()} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800/70 text-neutral-100 rounded-2xl rounded-bl-sm px-4 py-2 text-sm shadow">
              Thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

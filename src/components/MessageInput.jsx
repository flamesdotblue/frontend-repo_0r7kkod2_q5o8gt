import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    setText("");
    await onSend(content);
  };

  return (
    <form onSubmit={submit} className="w-full border-t border-neutral-800 bg-neutral-950/60 backdrop-blur p-3">
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-md bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 px-3 py-2"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </form>
  );
}

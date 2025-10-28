import { Plus, MessageSquare } from "lucide-react";

export default function SessionSidebar({ sessions, currentId, onNew, onSelect }) {
  return (
    <aside className="w-full md:w-60 border-r border-neutral-800 bg-neutral-950/40">
      <div className="p-3 flex items-center justify-between">
        <h2 className="text-neutral-300 text-sm font-medium">Conversations</h2>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      <div className="px-2 pb-2 space-y-1 max-h-[calc(100vh-120px)] overflow-auto">
        {sessions.length === 0 && (
          <div className="text-neutral-500 text-sm px-2 py-6 text-center">
            No conversations yet
          </div>
        )}
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-neutral-800/60 ${
              currentId === s.id ? "bg-neutral-800/80" : "bg-transparent"
            }`}
          >
            <MessageSquare className="h-4 w-4 text-neutral-400" />
            <span className="text-sm text-neutral-200 truncate">{s.title || "New Chat"}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

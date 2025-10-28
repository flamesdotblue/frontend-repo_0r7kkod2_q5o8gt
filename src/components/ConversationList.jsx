import { Plus } from 'lucide-react'

export default function ConversationList({ conversations, currentId, onSelect, onNew }) {
  return (
    <aside className="w-full md:w-64 border-r bg-white/60 backdrop-blur">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-sm font-medium text-gray-700">Conversations</h2>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} /> New
        </button>
      </div>
      <nav className="overflow-y-auto max-h-[calc(100vh-64px)]">
        {conversations.length === 0 ? (
          <p className="text-xs text-gray-500 px-3 pb-4">No conversations yet</p>
        ) : (
          <ul className="p-2 space-y-1">
            {conversations.map((c) => (
              <li key={c._id}>
                <button
                  onClick={() => onSelect(c._id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition ${
                    currentId === c._id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {c.title || 'Untitled conversation'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  )
}

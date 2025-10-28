export default function MessageList({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-10">
          Start a conversation by sending a message below.
        </div>
      )}
      {messages.map((m, idx) => (
        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
            }`}
          >
            <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl px-4 py-2 text-sm bg-white text-gray-800 border animate-pulse">
            Thinking...
          </div>
        </div>
      )}
    </div>
  )
}

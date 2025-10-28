import { useState } from 'react'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const msg = text.trim()
    if (!msg) return
    setText('')
    onSend(msg)
  }

  return (
    <form onSubmit={submit} className="p-3 border-t bg-white/80 backdrop-blur">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] max-h-40"
          rows={1}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </form>
  )
}

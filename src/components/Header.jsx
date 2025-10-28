import { MessageCircle } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-600 text-white">
          <MessageCircle size={20} />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight">AI Chatbot</h1>
          <p className="text-xs text-gray-500">Chat with an assistant powered by your backend</p>
        </div>
      </div>
    </header>
  )
}

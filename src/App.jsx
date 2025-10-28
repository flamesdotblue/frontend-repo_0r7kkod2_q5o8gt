import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ConversationList from './components/ConversationList'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [conversations, setConversations] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/conversations`)
      const data = await res.json()
      setConversations(data)
      if (!currentId && data.length > 0) {
        setCurrentId(data[0]._id)
      }
    } catch (e) {
      console.error('Failed to load conversations', e)
    }
  }

  const fetchMessages = async (id) => {
    if (!id) return
    try {
      const res = await fetch(`${API_BASE}/api/conversations/${id}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (e) {
      console.error('Failed to load conversation', e)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (currentId) fetchMessages(currentId)
  }, [currentId])

  const onNew = () => {
    setCurrentId(null)
    setMessages([])
  }

  const onSend = async (text) => {
    setLoading(true)
    // optimistic user message
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversation_id: currentId || undefined }),
      })
      const data = await res.json()
      const newId = data.conversation_id
      if (!currentId) {
        setCurrentId(newId)
      }
      // append assistant reply
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
      // refresh conversation list
      fetchConversations()
    } catch (e) {
      console.error('Send failed', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] h-[calc(100vh-64px)]">
        <ConversationList
          conversations={conversations}
          currentId={currentId}
          onSelect={(id) => setCurrentId(id)}
          onNew={onNew}
        />
        <main className="flex flex-col">
          <MessageList messages={messages} loading={loading} />
          <ChatInput onSend={onSend} disabled={loading} />
        </main>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import API from '../services/api'

const ChatPanel = ({reportText, mode}) => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if(!input.trim()) return

        const userMsg = {role: "user", content: input}
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setLoading(true)

        const res = await API.post("/api/chat",{
            message: userMsg.content,
            report_text: reportText,
            mode
        })

        const botMsg = {role: "assistant", content: res.data.reply}
        setMessages(prev => [...prev, botMsg])
        setLoading(false)
    }

  return (
    <div className='bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col'>
      <div className='px-4 py-3 border-b text-sm font-semibold text-teal-700'>
        CHAT WITH REPORT
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {
            messages.length === 0 && (
                <p className='text-sm text-gray-500'>
                    Ask questions about the uploaded medical report 
                </p>
            )
        }

        {
            messages.map((msg,idx)=>(
                <div
                    key={idx}
                    className={`text-sm p-3 rounded-lg max-w-[85%] ${msg.role === "user" ? "bg-teal-600 text-white ml-auto" : "bg-gray-100 text-gray-800"}`}
                >
                    {msg.content}
                </div>
            ))
        }

        {
            loading && (
                <p className='text-xs text-gray-500'>Thinking...</p>
            )
        }
      </div>

      <div className='border-t p-3 flex gap-2'>
        <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500'
        />
        <button
            onClick={sendMessage}
            className='bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-lg text-sm font-medium'
        >
            Send 
        </button>
      </div>
    </div>
  )
}

export default ChatPanel

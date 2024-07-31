'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'
import withAuth from '@/app/withAuth'

interface ErrorResponse {
  response: {
    status: number
  }
}

const Chatbot: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [messages, setMessages] = useState<
    {
      type: 'user' | 'bot' | 'loading'
      text: string
    }[]
  >([])
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const userMessage = { type: 'user' as const, text: prompt }
    setMessages([
      ...messages,
      userMessage,
      { type: 'loading' as const, text: '...' }
    ])
    setPrompt('')

    try {
      const res = await api.post('/chatbot', { prompt })

      if (res.status !== 200) {
        throw new Error('Error in fetching response')
      }

      const botMessage = { type: 'bot' as const, text: res.data.message }
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botMessage])
    } catch (error) {
      const errorRes = error as ErrorResponse
      if (errorRes.response.status === 401) {
        router.push('/login')
      } else {
        const botMessage = {
          type: 'bot' as const,
          text: 'Something went wrong. Please try refreshing your web browser and try again.'
        }
        setMessages(prevMessages => [...prevMessages.slice(0, -1), botMessage])
      }
    }
  }

  const isLoading = messages.some(message => message.type === 'loading')

  return (
    <div className="min-h-screen flex flex-col justify-between mx-auto bg-white p-5 rounded-lg shadow-lg w-full lg:w-11/12 md:w-9/12 lg:p-10">
      <div className="text-center mb-5">
        <img
          src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2Fmaskot-melancong.png?alt=media&token=d1a78151-3b0a-473f-9b2f-c499a62c2e0a'
          alt='Chatbot'
          className="w-32 h-32 mx-auto mb-3"
        />
        <p className="text-lg text-gray-700">
          Hello! My name is MelBot. I&apos;m here to help you find<br />
          tourist destinations and plan your trip. I&apos;m ready to help!
        </p>
      </div>
      <hr className="w-full border-t border-gray-300 mb-5" />
      <div className={`w-full flex-1 overflow-y-auto mb-5 ${isLoading ? 'overflow-hidden' : ''}`}>
        <div className="flex flex-col">
          {messages.map((message, index) =>
            message.type === 'user' ? (
              <div
                key={index}
                className="self-end bg-indigo-600 text-white p-3 rounded-lg my-1 max-w-[80%]"
              >
                {message.text}
              </div>
            ) : message.type === 'bot' ? (
              <div
                key={index}
                className="self-start bg-gray-200 text-black p-3 rounded-lg my-1 max-w-[80%]"
              >
                {message.text}
              </div>
            ) : (
              <div
                key={index}
                className="self-start bg-gray-200 text-black p-3 rounded-lg my-1 max-w-[80%] flex"
              >
                <div className="animate-pulse mx-1">.</div>
                <div className="animate-pulse mx-1">.</div>
                <div className="animate-pulse mx-1">.</div>
              </div>
            )
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex">
        <input
          type='text'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder='Type message...'
          required
          className="flex-1 p-3 text-black border border-cyan-800 rounded-l-lg bg-gray-100"
        />
        <button type='submit' className="p-3 bg-cyan-800 text-white rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  )
}

export default withAuth(Chatbot)

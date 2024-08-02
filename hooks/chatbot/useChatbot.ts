// src/hooks/useChatbot.ts
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ErrorResponse } from '@/dto/errorResponseDto'
import { chatbotMessageDto } from '@/dto/chatbotMessageDto'
import { fetchChatbotService } from '@/services/chatbot/fetchChatbotService'

export const useChatbot = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [messages, setMessages] = useState<chatbotMessageDto[]>([])
  const [typingText, setTypingText] = useState<string>('')
  const router = useRouter()

  const addMessage = (message: chatbotMessageDto) => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  const replaceLastMessage = (message: chatbotMessageDto) => {
    setMessages(prevMessages => [...prevMessages.slice(0, -1), message])
  }

  const typeEffect = (text: string) => {
    if (!text) {
      return
    }
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        replaceLastMessage({ type: 'bot', text })
        setTypingText('')
      }
    }, 20)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    addMessage({ type: 'user', text: prompt })
    addMessage({ type: 'loading', text: '...' })
    setPrompt('')

    try {
      const message = await fetchChatbotService(prompt)
      const botMessage = { type: 'bot' as const, text: message }
      replaceLastMessage({ type: 'bot', text: '' })
      typeEffect(botMessage.text)
    } catch (error) {
      const errorRes = error as ErrorResponse
      if (errorRes?.response?.status === 401) {
        router.push('/login')
      } else {
        replaceLastMessage({
          type: 'bot',
          text: 'Error: Something went wrong. Please try refreshing your web browser and try again.'
        })
      }
    }
  }

  return {
    prompt,
    setPrompt,
    messages,
    typingText,
    handleSubmit
  }
}

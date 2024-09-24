import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import api from '@/utils/api/axios'
import { ErrorResponse } from '@/dto/errorResponseDto'
import { chatbotMessageDto } from '@/dto/chatbotMessageDto'
import { fetchChatbotService } from '@/services/chatbot/fetchChatbotService'

export const useChatbot = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [messages, setMessages] = useState<chatbotMessageDto[]>([])
  const [typingText, setTypingText] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const router = useRouter()

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await api.get('/auth/token-validation')
        if (!response.data.valid) {
          localStorage.removeItem('token')
          Swal.fire({
            title: 'Login Required',
            text: 'You must login to continue.',
            icon: 'info',
            confirmButtonColor: '#00838F'
          }).then(result => {
            if (result.isConfirmed) {
              router.push('/login')
            }
          })
        }
      } catch (err) {
        localStorage.removeItem('token')
      }
    }
  }, [router])

  useEffect(() => {
    validateToken()
  }, [validateToken])

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

    setIsTyping(true)
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        replaceLastMessage({ type: 'bot', text })
        setTypingText('')
        setIsTyping(false)
      }
    }, 15)
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

        setIsTyping(false)
      }
    }
  }

  return {
    prompt,
    setPrompt,
    messages,
    typingText,
    isTyping,
    handleSubmit
  }
}

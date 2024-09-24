import { Metadata } from 'next'

import ChatBot from '@/app/(route)/dashboard/chatbot/components/ChatBot'

export const metadata: Metadata = {
  title: 'Chatbot'
}
const ChatbotPage = () => {
  return (
    <>
      <ChatBot />
    </>
  )
}

export default ChatbotPage

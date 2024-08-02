import ChatBot from '@/pages/dashboard/ChatBot'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'Chatbot'
}
const Chatbot: NextPage = () => {
  return (
    <>
      <ChatBot />
    </>
  )
}

export default Chatbot

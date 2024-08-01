import ChatBot from '@/components/pages/dashboard/ChatBot'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'Chatbot'
}
const Chatbot: NextPage = () => {
  return (
    <>
      <ChatBot
        response={{
          status: 200
        }}
      />
    </>
  )
}

export default Chatbot

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import api from '../api'
import withAuth from '../withAuth'

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
    <ChatbotContainer>
      <Header>
        <BotImage
          src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2Fmaskot-melancong.png?alt=media&token=d1a78151-3b0a-473f-9b2f-c499a62c2e0a'
          alt='Chatbot'
        />
        <WelcomeMessage>
          Hello! My name is MelBot. I&apos;m here to help you find
          <br></br>
          tourist destinations and plan your trip. I&apos;m ready to help!
        </WelcomeMessage>
      </Header>
      <Divider />
      <ChatArea className={isLoading ? 'no-scroll' : ''}>
        <Chat>
          {messages.map((message, index) =>
            message.type === 'user' ? (
              <UserMessage key={index}>{message.text}</UserMessage>
            ) : message.type === 'bot' ? (
              <BotMessage key={index}>{message.text}</BotMessage>
            ) : (
              <LoadingMessage key={index}>
                <Dot>.</Dot>
                <Dot>.</Dot>
                <Dot>.</Dot>
              </LoadingMessage>
            )
          )}
        </Chat>
      </ChatArea>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder='Type message...'
          required
        />
        <Button type='submit'>Send</Button>
      </Form>
    </ChatbotContainer>
  )
}

const ChatbotContainer = styled.div`
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`

const BotImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`

const WelcomeMessage = styled.p`
  font-size: 16px;
  color: #333;
`

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 20px;
`

const ChatArea = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;

  &.no-scroll {
    overflow-y: hidden;
  }
`

const Chat = styled.div`
  display: flex;
  flex-direction: column;
`

const UserMessage = styled.div`
  align-self: flex-end;
  background: #4629f2;
  color: white;
  padding: 10px;
  border-radius: 20px;
  margin: 5px 0;
  max-width: 80%;
`

const BotMessage = styled.div`
  align-self: flex-start;
  background: #e0e0e0;
  color: black;
  padding: 10px;
  border-radius: 20px;
  margin: 5px 0;
  max-width: 80%;
`

const LoadingMessage = styled.div`
  align-self: flex-start;
  background: #e0e0e0;
  color: black;
  padding: 10px;
  border-radius: 20px;
  margin: 5px 0;
  max-width: 80%;
  display: flex;
`

const dotFlashing = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50%,
  100% {
    background-color: #333;
  }
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #333;
  border-radius: 50%;
  margin: 0 4px;
  animation: ${dotFlashing} 1s infinite linear;
`

const Form = styled.form`
  display: flex;
  width: 100%;
`

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  background-color: #d7d7d7;
  color: black;
`

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #1e1e1e;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
`

export default withAuth(Chatbot)

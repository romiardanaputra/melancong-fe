'use client'

import React from 'react'
import Image from 'next/image'

import withAuth from '@/app/withAuth'
import { useChatbot } from '@/hooks/chatbot/useChatbot'

const ChatBotContent = () => {
  const { prompt, setPrompt, messages, typingText, isTyping, handleSubmit } =
    useChatbot()

  const isLoading = messages.some(message => message.type === 'loading')
  return (
    <>
      <div className='w-full bg-white'>
        <div className='mx-auto flex min-h-screen w-full flex-col justify-between rounded-lg p-5 md:w-9/12 lg:w-11/12 lg:p-10'>
          <div className='mb-5 text-center'>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2Fmaskot-melancong.png?alt=media&token=d1a78151-3b0a-473f-9b2f-c499a62c2e0a'
              alt='Chatbot'
              className='mx-auto mb-3'
              width={128}
              height={128}
              priority
              quality={50}
            />
            <p className='text-lg text-gray-700'>
              Hello! My name is MelBot. I&apos;m here to help you find
              <br />
              tourist destinations and plan your trip. I&apos;m ready to help!
            </p>
          </div>
          <hr className='mb-5 w-full border-t border-gray-300' />
          <div
            className={`mb-5 w-full flex-1 overflow-y-auto ${isLoading ? 'overflow-hidden' : ''}`}
          >
            <div className='flex flex-col'>
              {messages.map((message, index) =>
                message.type === 'user' ? (
                  <div
                    key={index}
                    className='my-1 max-w-[80%] self-end rounded-lg bg-indigo-600 p-3 text-white'
                  >
                    {message.text}
                  </div>
                ) : message.type === 'bot' ? (
                  <div
                    key={index}
                    className='my-1 max-w-[80%] self-start rounded-lg bg-gray-200 p-3 text-black'
                  >
                    {typingText && index === messages.length - 1
                      ? typingText
                      : message.text}
                  </div>
                ) : (
                  <div
                    key={index}
                    className='my-1 flex max-w-[80%] self-start rounded-lg bg-gray-200 p-3 text-black'
                  >
                    <div className='mx-1 animate-pulse'>.</div>
                    <div className='mx-1 animate-pulse'>.</div>
                    <div className='mx-1 animate-pulse'>.</div>
                  </div>
                )
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className='flex w-full'>
            <input
              type='text'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder='Type message...'
              required
              disabled={isLoading || isTyping}
              className={`flex-1 rounded-l-lg border border-cyan-800 bg-gray-100 p-3 text-black ${isLoading || isTyping ? 'cursor-not-allowed bg-gray-300' : ''}`}
            />
            <button
              type='submit'
              disabled={isLoading || isTyping}
              className={`rounded-r-lg bg-cyan-800 p-3 text-white ${isLoading || isTyping ? 'cursor-not-allowed bg-gray-500' : ''}`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default withAuth(ChatBotContent)

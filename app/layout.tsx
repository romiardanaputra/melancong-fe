import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { NextUIProvider } from '@nextui-org/system'

const fontSans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Melancong',
  description:
    'Melancong adalah suatu website yang dimana menampilkan destinasi wisata yang berada di bali, memberikan rekomendasi melancong sekitaran bali dengan berbagai fitur dan memberikan rekomendasi terbaik untuk menentukan decision making'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <NextUIProvider>
          <ThemeProvider attribute='class' defaultTheme='light'>
            {/* <header></header> */}
            <main>{children}</main>
            {/* <footer></footer> */}
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}

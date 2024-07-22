import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Poppins } from 'next/font/google'
import './globals.css'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { NextUIProvider } from '@nextui-org/system'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body className={cn('min-h-dvh font-sans antialiased', poppins.variable)}>
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

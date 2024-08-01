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
  title: {
    default: 'Melancong - Tourism Recommendation in Bali',
    template: '%s | Melancong - Tourism Recommendation in Bali'
  },
  keywords: 'melancong, travel, recommendation, bali',
  description:
    'Melancong is a website that showcases tourist destinations in Bali, provides travel recommendations around Bali with various features, and offers the best recommendations to aid in decision making',
  openGraph: {
    title: 'Melancong - Tourism Recommendation in Bali',
    description:
      'Melancong is a website that showcases tourist destinations in Bali, provides travel recommendations around Bali with various features, and offers the best recommendations to aid in decision making',
    type: 'website',
    locale: 'en_US',
    url: 'https://melancong-fe.vercel.app/',
    siteName: 'Melancong'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: '/favicon.ico'
  }
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
            <main>{children}</main>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}

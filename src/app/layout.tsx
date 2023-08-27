import AuthProvider from '@/context/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClimbOn',
  description: 'ClimbOn is a custom training tracker app for climbers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-l from-gray-50 to-white'>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position='top-center' />
        </AuthProvider>
      </body>
    </html>
  )
}

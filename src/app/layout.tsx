import type { Metadata } from 'next'
import { AuthUserProvider } from '../../firebase/auth'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The balacing act',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthUserProvider>
          {children}
        </AuthUserProvider>
      </body>
    </html>
  )
}

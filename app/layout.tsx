import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getPages } from '@/app/utils/pages';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X Factor League',
  description: 'A website for all of your fantasy league needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pages = getPages() || [];

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

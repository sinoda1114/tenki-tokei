import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '時計天気',
  description: '郵便番号や地域名から天気を確認できるアプリ',
  icons: {
    icon: '/icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <header className="fixed w-full bg-white dark:bg-gray-800 shadow-sm" role="banner">
          <nav className="container mx-auto px-4 py-3" role="navigation">
            <div id="currentTime" className="text-lg font-semibold text-gray-700 dark:text-gray-200" aria-live="polite" />
          </nav>
        </header>
        {children}
        <footer className="bg-gray-100 dark:bg-gray-800 mt-auto" role="contentinfo">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              &copy; 2024 天気情報チェッカー All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
} 
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Proposal — Hệ thống Quản lý Bán hàng & Công Nợ',
  description:
    'BA Document & Báo giá dự án Clone MISA AMIS — Phân hệ Bán hàng, Công nợ, In phiếu chuyên nghiệp.',
  keywords: ['MISA AMIS', 'quản lý bán hàng', 'công nợ', 'phần mềm', 'proposal'],
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-black focus:rounded-lg">
          Chuyển đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  )
}

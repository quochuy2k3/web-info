import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

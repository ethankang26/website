import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unrepped',
  description: 'Created with v0',
  generator: 'unrepped.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

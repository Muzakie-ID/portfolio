import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Adib Muzakki | Portfolio',
  description: 'Developer full-stack | Penggemar UI/UX | Pemecah masalah kreatif',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-primary via-secondary to-primary flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-6 px-4 border-t border-accent/20 text-center text-gray-400 text-sm">
          <p>Built with ❤️ by <span className="text-accent font-semibold">Muzakie-ID</span> by AI</p>
        </footer>
      </body>
    </html>
  )
}

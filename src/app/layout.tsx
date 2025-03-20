import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Book, Github, Search } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Multilingual Al-Quran API",
  description: "API for the Holy Quran with translations in multiple languages",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <Book className="h-6 w-6" />
                  <Link href="/" className="text-xl font-bold">
                    Quran API
                  </Link>
                </div>
                <nav className="flex items-center gap-4">
                  <Link href="/search" className="flex items-center gap-1 text-sm hover:underline">
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                  <Link href="/about" className="text-sm hover:underline">
                    About
                  </Link>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    className="flex items-center gap-1 text-sm hover:underline"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Multilingual Al-Quran API. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
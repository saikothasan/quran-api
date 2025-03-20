import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Amiri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Analytics } from "@/components/analytics"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://alquran-api.pages.dev"),
  title: {
    default: "Al-Quran API - Multilingual Quran API with Translations",
    template: "%s | Al-Quran API",
  },
  description:
    "A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages including Arabic, English, Bengali, and more.",
  keywords: ["quran", "api", "islamic", "multilingual", "translations", "arabic", "bengali", "english", "holy quran"],
  authors: [
    {
      name: "Al-Quran API Team",
      url: "https://alquran-api.pages.dev",
    },
  ],
  creator: "Al-Quran API Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alquran-api.pages.dev",
    title: "Al-Quran API - Multilingual Quran API with Translations",
    description:
      "A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages including Arabic, English, Bengali, and more.",
    siteName: "Al-Quran API",
    images: [
      {
        url: "https://alquran-api.pages.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al-Quran API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Quran API - Multilingual Quran API with Translations",
    description:
      "A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages including Arabic, English, Bengali, and more.",
    images: ["https://alquran-api.pages.dev/og-image.png"],
    creator: "@alquranapi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://alquran-api.pages.dev/site.webmanifest",
    generator: 'saikothasan.pages.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, amiri.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'

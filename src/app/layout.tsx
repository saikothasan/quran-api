import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Amiri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"
import Script from "next/script"

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
    default: "Al-Quran API - Multilingual Quran API with Translations & Search",
    template: "%s | Al-Quran API - Islamic Scripture Database",
  },
  description:
    "Access the Holy Quran through our comprehensive RESTful API with translations in Arabic, English, Bengali, Urdu and more. Perfect for Islamic apps, websites, and research tools.",
  keywords: [
    "quran api",
    "islamic api",
    "multilingual quran",
    "quran translations",
    "arabic quran",
    "bengali quran",
    "english quran",
    "holy quran database",
    "islamic scripture api",
    "quran search api",
    "islamic developer tools",
    "quran verses api",
    "surah api",
    "islamic application development",
  ],
  authors: [
    {
      name: "Al-Quran API Team",
      url: "https://alquran-api.pages.dev",
    },
  ],
  creator: "Al-Quran API Team",
  publisher: "Al-Quran API",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alquran-api.pages.dev",
    title: "Al-Quran API - Multilingual Quran API with Translations & Search",
    description:
      "Access the Holy Quran through our comprehensive RESTful API with translations in Arabic, English, Bengali, Urdu and more. Perfect for Islamic apps, websites, and research tools.",
    siteName: "Al-Quran API",
    images: [
      {
        url: "https://alquran-api.pages.dev/quran.png",
        width: 1200,
        height: 630,
        alt: "Al-Quran API - Multilingual Quran Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Quran API - Multilingual Quran API with Translations",
    description:
      "Access the Holy Quran through our comprehensive RESTful API with translations in Arabic, English, Bengali, Urdu and more. Perfect for Islamic apps, websites, and research tools.",
    images: ["https://alquran-api.pages.dev/og-image.png"],
    creator: "@alquranapi",
  },
  alternates: {
    canonical: "https://alquran-api.pages.dev",
    languages: {
      "en-US": "https://alquran-api.pages.dev/en-US",
      "ar-SA": "https://alquran-api.pages.dev/ar-SA",
    },
  },
  category: "Technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://alquran-api.pages.dev/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#046C4E" }, // Green shade for light mode
    { media: "(prefers-color-scheme: dark)", color: "#065F46" }, // Darker green for dark mode
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
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, amiri.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1W3WDXDHR6" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1W3WDXDHR6', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Al-Quran API",
              url: "https://alquran-api.pages.dev",
              description:
                "A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages including Arabic, English, Bengali, and more.",
              applicationCategory: "ReferenceApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Al-Quran API Team",
                url: "https://alquran-api.pages.dev",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}


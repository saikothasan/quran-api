"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Github, Menu, Search, X, Download, MessageCircle } from "lucide-react"
import { useState, Suspense } from "react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function SiteHeaderInner() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/search",
      label: "Search",
      active: pathname === "/search",
    },
    {
      href: "/demo",
      label: "Demo App",
      active: pathname === "/demo",
    },
    {
      href: "/documentation",
      label: "Documentation",
      active: pathname === "/documentation",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden font-bold sm:inline-block">Al-Quran API</span>
            <Badge className="ml-2 hidden sm:inline-flex bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              v1.0
            </Badge>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                route.active ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
          <Link
            href="https://t.me/drkingbd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <div className="flex items-center">
              <MessageCircle className="mr-1 h-4 w-4" />
              Telegram
            </div>
          </Link>
          <Link href="https://github.com/saikothasan/quran-api" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-800">
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                  route.active ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="https://t.me/drkingbd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Telegram Channel
            </Link>
            <Link
              href="https://github.com/saikothasan/quran-api"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub Repository
            </Link>
            <Link
              href="https://github.com/saikothasan/quran-api/archive/refs/heads/main.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Source
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export function SiteHeader() {
  return (
    <Suspense fallback={<div className="h-16 border-b"></div>}>
      <SiteHeaderInner />
    </Suspense>
  )
}


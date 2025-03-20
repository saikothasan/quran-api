import Link from "next/link"
import { Book } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-primary" />
              <span className="font-bold">Al-Quran API</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="text-sm text-muted-foreground hover:text-foreground">
                    Demo App
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/yourusername/alquran-api"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">API</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation#endpoints" className="text-sm text-muted-foreground hover:text-foreground">
                    Endpoints
                  </Link>
                </li>
                <li>
                  <Link href="/documentation#languages" className="text-sm text-muted-foreground hover:text-foreground">
                    Languages
                  </Link>
                </li>
                <li>
                  <Link href="/documentation#usage" className="text-sm text-muted-foreground hover:text-foreground">
                    Usage
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Al-Quran API. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


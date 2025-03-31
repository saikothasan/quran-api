import Link from "next/link"
import { Book, Github, Heart, Mail, MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold">Al-Quran API</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages. Open
              source and free to use for all Islamic applications and websites.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/saikothasan/quran-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://t.me/drkingbd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link
                href="mailto:info@alquran-api.pages.dev"
                className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/documentation"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Demo App
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/saikothasan/quran-api"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    About Project
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-emerald-600 dark:text-emerald-400">API</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/documentation#endpoints"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Endpoints
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation#languages"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Languages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation#usage"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Usage Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Search Functionality
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-emerald-100 dark:border-emerald-900/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Al-Quran API. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Made with</span>
            <Heart className="h-3 w-3 text-red-500" />
            <span className="text-xs text-muted-foreground">for the Ummah</span>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


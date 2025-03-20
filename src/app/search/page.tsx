"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Book, Globe, SearchIcon } from "lucide-react"
import type { Language } from "@/lib/quran-utils"

interface SearchResult {
  surah: {
    id: number
    name: string
    transliteration: string
    translation: string
  }
  verses: {
    id: number
    text: string
    translation?: string
    transliteration?: string
  }[]
}

interface SearchResponse {
  language: string
  query: string
  results: SearchResult[]
  total: number
}

export default function SearchPage() {
  const [query, setQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [isLoadingLanguages, setIsLoadingLanguages] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch available languages
    const fetchLanguages = async () => {
      try {
        setIsLoadingLanguages(true)
        setError(null)

        const response = await fetch("/api/quran/languages")

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setLanguages(data.languages || [])

        // Set default language if available
        if (data.languages && data.languages.length > 0) {
          // Prefer English if available
          const englishLang = data.languages.find((lang: Language) => lang.code === "en")
          if (englishLang) {
            setSelectedLanguage("en")
          } else {
            setSelectedLanguage(data.languages[0].code)
          }
        }
      } catch (error) {
        console.error("Failed to fetch languages:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch languages")
        // Set default languages as fallback
        setLanguages([
          { code: "en", name: "English", nativeName: "English", direction: "ltr" },
          { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
        ])
      } finally {
        setIsLoadingLanguages(false)
      }
    }

    fetchLanguages()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim().length < 3) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/quran/search?q=${encodeURIComponent(query)}&lang=${selectedLanguage}`)

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSearchResults(data)
    } catch (error) {
      console.error("Search error:", error)
      setError(error instanceof Error ? error.message : "Search failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center mb-6 text-sm hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-1">Please try again or check the server logs for more information.</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Search the Quran</CardTitle>
            <CardDescription>Search for words or phrases in the Quran in multiple languages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Select Language</h3>
            </div>

            {isLoadingLanguages ? (
              <div className="text-center py-4">Loading languages...</div>
            ) : (
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Separator />

            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter search term (minimum 3 characters)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={query.trim().length < 3 || isLoading}>
                {isLoading ? "Searching..." : "Search"}
                <SearchIcon className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {searchResults && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Search Results</h3>
                  <span className="text-sm text-muted-foreground">
                    Found {searchResults.total} {searchResults.total === 1 ? "verse" : "verses"}
                  </span>
                </div>

                {searchResults.results.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No results found for "{query}"</p>
                ) : (
                  <div className="space-y-6">
                    {searchResults.results.map((result) => (
                      <div key={result.surah.id} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Book className="h-5 w-5 text-primary" />
                          <h4 className="font-medium">
                            Surah {result.surah.transliteration}{" "}
                            {result.surah.translation && `(${result.surah.translation})`}
                          </h4>
                        </div>

                        <div className="space-y-4 pl-7">
                          {result.verses.map((verse) => (
                            <div key={verse.id} className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs">
                                  {verse.id}
                                </span>
                                <p dir="rtl" className="text-right font-arabic text-lg leading-loose">
                                  {verse.text}
                                </p>
                              </div>
                              {verse.transliteration && <p className="text-sm italic">{verse.transliteration}</p>}
                              {verse.translation && <p className="text-muted-foreground">{verse.translation}</p>}
                              <Separator className="mt-4" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


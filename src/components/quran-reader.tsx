"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Book, ChevronLeft, ChevronRight, Loader2, Search, Volume2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { Language } from "@/lib/quran-utils"

interface Surah {
  id: number
  name: string
  transliteration: string
  translation: string
  type: string
  total_verses: number
}

interface Verse {
  id: number
  text: string
  translation?: string
  transliteration?: string
}

interface ApiResponse {
  languages?: Language[]
  surahs?: Surah[]
  verses?: Verse[]
  language?: string
  error?: string
  [key: string]: any
}

interface QuranReaderProps {
  baseUrl: string
}

export function QuranReader({ baseUrl }: QuranReaderProps) {
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [selectedSurah, setSelectedSurah] = useState<number>(1)
  const [verses, setVerses] = useState<Verse[]>([])
  const [isLoadingLanguages, setIsLoadingLanguages] = useState<boolean>(true)
  const [isLoadingSurahs, setIsLoadingSurahs] = useState<boolean>(true)
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoadingLanguages(true)
        setError(null)

        const response = await fetch(`${baseUrl}/api/quran/languages`)

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ApiResponse

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
            setDirection("ltr")
          } else {
            setSelectedLanguage(data.languages[0].code)
            setDirection(data.languages[0].direction)
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
  }, [baseUrl])

  // Fetch surahs when language changes
  useEffect(() => {
    const fetchSurahs = async () => {
      if (!selectedLanguage) return

      try {
        setIsLoadingSurahs(true)
        setError(null)

        const response = await fetch(`${baseUrl}/api/quran?lang=${selectedLanguage}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch surahs: ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ApiResponse

        if (data.error) {
          throw new Error(data.error)
        }

        setSurahs(data.surahs || [])

        // Update direction based on selected language
        const lang = languages.find((l) => l.code === selectedLanguage)
        if (lang) {
          setDirection(lang.direction)
        }
      } catch (error) {
        console.error("Failed to fetch surahs:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch surahs")
      } finally {
        setIsLoadingSurahs(false)
      }
    }

    fetchSurahs()
  }, [baseUrl, selectedLanguage, languages])

  // Fetch verses when surah changes
  useEffect(() => {
    const fetchVerses = async () => {
      if (!selectedSurah) return

      try {
        setIsLoadingVerses(true)
        setError(null)

        const response = await fetch(`${baseUrl}/api/quran/surah/${selectedSurah}?lang=${selectedLanguage}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch verses: ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ApiResponse

        if (data.error) {
          throw new Error(data.error)
        }

        setVerses(data.verses || [])
      } catch (error) {
        console.error("Failed to fetch verses:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch verses")
      } finally {
        setIsLoadingVerses(false)
      }
    }

    fetchVerses()
  }, [baseUrl, selectedSurah, selectedLanguage])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim().length < 3) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 3 characters",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSearching(true)
      setError(null)

      const response = await fetch(
        `${baseUrl}/api/quran/search?q=${encodeURIComponent(searchQuery)}&lang=${selectedLanguage}`,
      )

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`)
      }

      const data = (await response.json()) as ApiResponse

      if (data.error) {
        throw new Error(data.error)
      }

      setSearchResults(data.results || [])

      if ((data.results || []).length === 0) {
        toast({
          title: "No results found",
          description: `No matches found for "${searchQuery}"`,
        })
      }
    } catch (error) {
      console.error("Search error:", error)
      setError(error instanceof Error ? error.message : "Search failed")
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    // Reset search when language changes
    setSearchQuery("")
    setSearchResults([])
  }

  const handleSurahChange = (value: string) => {
    setSelectedSurah(Number.parseInt(value))
  }

  const nextSurah = () => {
    if (selectedSurah < 114) {
      setSelectedSurah(selectedSurah + 1)
    }
  }

  const prevSurah = () => {
    if (selectedSurah > 1) {
      setSelectedSurah(selectedSurah - 1)
    }
  }

  const playAudio = (verse: Verse) => {
    // This is a placeholder for audio functionality
    toast({
      title: "Audio feature",
      description: "Audio playback would be implemented here",
    })
  }

  const currentSurah = surahs.find((s) => s.id === selectedSurah)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quran Reader</CardTitle>
        <CardDescription>Read and search the Quran in multiple languages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">Error: {error}</div>}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">Language</label>
              {isLoadingLanguages ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
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
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium block mb-2">Surah</label>
              {isLoadingSurahs ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedSurah.toString()} onValueChange={handleSurahChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select surah" />
                  </SelectTrigger>
                  <SelectContent>
                    {surahs.map((surah) => (
                      <SelectItem key={surah.id} value={surah.id.toString()}>
                        {surah.id}. {surah.transliteration} ({surah.translation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <Tabs defaultValue="read">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="read">
                <Book className="h-4 w-4 mr-2" />
                Read
              </TabsTrigger>
              <TabsTrigger value="search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </TabsTrigger>
            </TabsList>
            <TabsContent value="read" className="space-y-4 pt-4">
              {currentSurah && (
                <div className="flex flex-col sm:flex-row justify-between items-center bg-muted p-4 rounded-lg">
                  <div>
                    <h2 className="text-xl font-bold">
                      {currentSurah.transliteration} ({currentSurah.translation})
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {currentSurah.total_verses} verses • {currentSurah.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="icon" onClick={prevSurah} disabled={selectedSurah <= 1}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSurah} disabled={selectedSurah >= 114}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {isLoadingVerses ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {verses.map((verse) => (
                      <motion.div
                        key={verse.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{verse.id}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => playAudio(verse)} title="Play audio">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p
                          dir={direction}
                          className={`text-xl leading-relaxed ${direction === "rtl" ? "font-arabic text-right" : ""}`}
                        >
                          {verse.text}
                        </p>
                        {verse.transliteration && <p className="text-sm italic">{verse.transliteration}</p>}
                        {verse.translation && <p className="text-muted-foreground">{verse.translation}</p>}
                        <Separator className="my-2" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </TabsContent>
            <TabsContent value="search" className="space-y-4 pt-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search the Quran (min 3 characters)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={searchQuery.trim().length < 3 || isSearching}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="ml-2 hidden sm:inline">Search</span>
                </Button>
              </form>

              {searchResults.length > 0 && (
                <div className="space-y-6 mt-4">
                  <h3 className="text-lg font-medium">Search Results for "{searchQuery}"</h3>
                  {searchResults.map((result) => (
                    <div key={result.surah.id} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">
                          Surah {result.surah.transliteration}{" "}
                          {result.surah.translation && `(${result.surah.translation})`}
                        </h4>
                      </div>

                      <div className="space-y-4 pl-7">
                        {result.verses.map((verse: Verse) => (
                          <div key={verse.id} className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Badge variant="outline">{verse.id}</Badge>
                              <p
                                dir={direction}
                                className={`text-lg leading-relaxed ${
                                  direction === "rtl" ? "font-arabic text-right" : ""
                                }`}
                              >
                                {verse.text}
                              </p>
                            </div>
                            {verse.transliteration && <p className="text-sm italic">{verse.transliteration}</p>}
                            {verse.translation && <p className="text-muted-foreground">{verse.translation}</p>}
                            <Separator className="my-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8 text-muted-foreground">No results found for "{searchQuery}"</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Powered by Al-Quran API</p>
      </CardFooter>
      <Toaster />
    </Card>
  )
}


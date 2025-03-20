"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowRight, Book, Code, Copy, ExternalLink, Globe } from "lucide-react"
import type { Language } from "@/lib/quran-utils"

interface ApiResponse {
  languages?: Language[]
  error?: string
  [key: string]: any
}

export default function Home() {
  const [surahNumber, setSurahNumber] = useState<string>("")
  const [verseNumber, setVerseNumber] = useState<string>("")
  const [apiUrl, setApiUrl] = useState<string>("")
  const [responseJson, setResponseJson] = useState<string>("")
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch available languages
    const fetchLanguages = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/quran/languages")

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
        setIsLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  const generateApiUrl = (type: string) => {
    let url = ""

    switch (type) {
      case "all":
        url = `/api/quran?lang=${selectedLanguage}`
        break
      case "surah":
        if (surahNumber) {
          url = `/api/quran/surah/${surahNumber}?lang=${selectedLanguage}`
        } else {
          return
        }
        break
      case "verse":
        if (surahNumber && verseNumber) {
          url = `/api/quran/surah/${surahNumber}/verse/${verseNumber}?lang=${selectedLanguage}`
        } else {
          return
        }
        break
      default:
        return
    }

    setApiUrl(url)
    fetchApiData(url)
  }

  const fetchApiData = async (url: string) => {
    try {
      setError(null)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data = (await response.json()) as ApiResponse

      if (data.error) {
        throw new Error(data.error)
      }

      setResponseJson(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setResponseJson(
        JSON.stringify(
          {
            error: error instanceof Error ? error.message : "Failed to fetch data",
          },
          null,
          2,
        ),
      )
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Al-Quran API</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A multilingual API to access the Holy Quran with translations in multiple languages
        </p>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
          <p className="font-medium">Error: {error}</p>
          <p className="text-sm mt-1">Please check the server logs for more information.</p>
        </div>
      )}

      <Tabs defaultValue="demo" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demo">
            <Book className="mr-2 h-4 w-4" />
            Try the API
          </TabsTrigger>
          <TabsTrigger value="docs">
            <Code className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Tester</CardTitle>
              <CardDescription>Test the Quran API endpoints with different parameters and languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Select Language</h3>
                </div>

                {isLoading ? (
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Select onValueChange={(value) => generateApiUrl(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select endpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Surahs</SelectItem>
                        <SelectItem value="surah">Specific Surah</SelectItem>
                        <SelectItem value="verse">Specific Verse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Input
                      type="number"
                      placeholder="Surah number (1-114)"
                      value={surahNumber}
                      onChange={(e) => setSurahNumber(e.target.value)}
                    />
                  </div>

                  <div>
                    <Input
                      type="number"
                      placeholder="Verse number"
                      value={verseNumber}
                      onChange={(e) => setVerseNumber(e.target.value)}
                    />
                  </div>
                </div>

                {apiUrl && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <code className="text-sm flex-1 break-all">
                      {window.location.origin}
                      {apiUrl}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(`${window.location.origin}${apiUrl}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={apiUrl} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {responseJson && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Response</h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(responseJson)}>
                      <Copy className="h-3 w-3 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">{responseJson}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to use the multilingual Al-Quran API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Base URL</h3>
                <code className="bg-muted p-2 rounded-md">
                  {typeof window !== "undefined" ? window.location.origin : ""}/api/quran
                </code>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Language Parameter</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All endpoints accept a <code className="bg-muted px-1">lang</code> query parameter to specify the
                  language.
                </p>
                <div className="bg-muted p-2 rounded-md">
                  <code className="text-sm">GET /api/quran?lang=en</code>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Available language codes:
                  {isLoading ? " Loading..." : languages.map((l) => l.code).join(", ")}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Endpoints</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium">Get Available Languages</h4>
                    <p className="text-sm text-muted-foreground mb-2">Returns a list of all available languages</p>
                    <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                      <code className="text-sm">GET /api/quran/languages</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setApiUrl("/api/quran/languages")
                          fetchApiData("/api/quran/languages")
                        }}
                      >
                        Try it <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium">Get All Surahs</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Returns a list of all surahs with basic information
                    </p>
                    <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                      <code className="text-sm">GET /api/quran?lang={"{language_code}"}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setApiUrl(`/api/quran?lang=${selectedLanguage}`)
                          fetchApiData(`/api/quran?lang=${selectedLanguage}`)
                        }}
                      >
                        Try it <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium">Get Specific Surah</h4>
                    <p className="text-sm text-muted-foreground mb-2">Returns a specific surah with all verses</p>
                    <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                      <code className="text-sm">
                        GET /api/quran/surah/{"{surah_id}"}?lang={"{language_code}"}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSurahNumber("1")
                          setApiUrl(`/api/quran/surah/1?lang=${selectedLanguage}`)
                          fetchApiData(`/api/quran/surah/1?lang=${selectedLanguage}`)
                        }}
                      >
                        Try it <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium">Get Specific Verse</h4>
                    <p className="text-sm text-muted-foreground mb-2">Returns a specific verse from a surah</p>
                    <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                      <code className="text-sm">
                        GET /api/quran/surah/{"{surah_id}"}/verse/{"{verse_id}"}?lang={"{language_code}"}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSurahNumber("1")
                          setVerseNumber("1")
                          setApiUrl(`/api/quran/surah/1/verse/1?lang=${selectedLanguage}`)
                          fetchApiData(`/api/quran/surah/1/verse/1?lang=${selectedLanguage}`)
                        }}
                      >
                        Try it <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium">Search</h4>
                    <p className="text-sm text-muted-foreground mb-2">Search for text in the Quran</p>
                    <div className="bg-muted p-2 rounded-md flex justify-between items-center">
                      <code className="text-sm">
                        GET /api/quran/search?q={"{search_query}"}&lang={"{language_code}"}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setApiUrl(`/api/quran/search?q=Allah&lang=${selectedLanguage}`)
                          fetchApiData(`/api/quran/search?q=Allah&lang=${selectedLanguage}`)
                        }}
                      >
                        Try it <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                All data is served from JSON files in the public directory
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}


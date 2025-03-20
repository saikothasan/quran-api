"use client"

import { useState, useEffect } from "react"
import { Copy, ExternalLink, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { Language } from "@/lib/quran-utils"

interface ApiResponse {
  languages?: Language[]
  error?: string
  [key: string]: any
}

interface ApiTesterProps {
  baseUrl: string
}

export function ApiTester({ baseUrl }: ApiTesterProps) {
  const [surahNumber, setSurahNumber] = useState<string>("")
  const [verseNumber, setVerseNumber] = useState<string>("")
  const [apiUrl, setApiUrl] = useState<string>("")
  const [responseJson, setResponseJson] = useState<string>("")
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [endpoint, setEndpoint] = useState<string>("")

  useEffect(() => {
    // Fetch available languages
    const fetchLanguages = async () => {
      try {
        setIsLoading(true)
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
  }, [baseUrl])

  const generateApiUrl = (type: string) => {
    setEndpoint(type)
    let url = ""

    switch (type) {
      case "all":
        url = `/api/quran?lang=${selectedLanguage}`
        break
      case "surah":
        if (surahNumber) {
          url = `/api/quran/surah/${surahNumber}?lang=${selectedLanguage}`
        } else {
          toast({
            title: "Missing parameter",
            description: "Please enter a surah number",
            variant: "destructive",
          })
          return
        }
        break
      case "verse":
        if (surahNumber && verseNumber) {
          url = `/api/quran/surah/${surahNumber}/verse/${verseNumber}?lang=${selectedLanguage}`
        } else {
          toast({
            title: "Missing parameters",
            description: "Please enter both surah and verse numbers",
            variant: "destructive",
          })
          return
        }
        break
      case "search":
        url = `/api/quran/search?q=Allah&lang=${selectedLanguage}`
        break
      case "languages":
        url = `/api/quran/languages`
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
      setResponseJson("")
      setIsLoading(true)

      const response = await fetch(`${baseUrl}${url}`)

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
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard",
    })
  }

  return (
    <Card className="w-full">
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

          {isLoading && !languages.length ? (
            <Skeleton className="h-10 w-full" />
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

          <div className="pt-4 border-t">
            <Tabs defaultValue="endpoints" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
              </TabsList>
              <TabsContent value="endpoints" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Button
                    variant={endpoint === "all" ? "default" : "outline"}
                    onClick={() => generateApiUrl("all")}
                    className="justify-start"
                  >
                    All Surahs
                  </Button>
                  <Button
                    variant={endpoint === "surah" ? "default" : "outline"}
                    onClick={() => generateApiUrl("surah")}
                    className="justify-start"
                  >
                    Specific Surah
                  </Button>
                  <Button
                    variant={endpoint === "verse" ? "default" : "outline"}
                    onClick={() => generateApiUrl("verse")}
                    className="justify-start"
                  >
                    Specific Verse
                  </Button>
                  <Button
                    variant={endpoint === "search" ? "default" : "outline"}
                    onClick={() => generateApiUrl("search")}
                    className="justify-start"
                  >
                    Search
                  </Button>
                  <Button
                    variant={endpoint === "languages" ? "default" : "outline"}
                    onClick={() => generateApiUrl("languages")}
                    className="justify-start"
                  >
                    Languages
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="parameters" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="surah-number" className="text-sm font-medium block mb-2">
                      Surah Number (1-114)
                    </label>
                    <Input
                      id="surah-number"
                      type="number"
                      placeholder="Enter surah number"
                      value={surahNumber}
                      onChange={(e) => setSurahNumber(e.target.value)}
                      min="1"
                      max="114"
                    />
                  </div>
                  <div>
                    <label htmlFor="verse-number" className="text-sm font-medium block mb-2">
                      Verse Number
                    </label>
                    <Input
                      id="verse-number"
                      type="number"
                      placeholder="Enter verse number"
                      value={verseNumber}
                      onChange={(e) => setVerseNumber(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {apiUrl && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md mt-4">
              <code className="text-sm flex-1 break-all">
                {baseUrl}
                {apiUrl}
              </code>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${baseUrl}${apiUrl}`)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={`${baseUrl}${apiUrl}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Response</h3>
            {responseJson && (
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(responseJson)}>
                <Copy className="h-3 w-3 mr-2" />
                Copy
              </Button>
            )}
          </div>
          {isLoading && apiUrl ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : responseJson ? (
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">{responseJson}</pre>
          ) : (
            <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
              Select an endpoint to see the response
            </div>
          )}
        </div>
      </CardContent>
      <Toaster />
    </Card>
  )
}


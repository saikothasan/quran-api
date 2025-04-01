"use client"

import { useState, Suspense } from "react"
import { ArrowRight, ChevronDown, ChevronUp, Copy, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"

interface ApiEndpointsProps {
  baseUrl: string
}

interface Endpoint {
  id: string
  title: string
  description: string
  method: string
  path: string
  parameters: {
    name: string
    type: string
    required: boolean
    description: string
  }[]
  response: string
}

function ApiEndpointsInner({ baseUrl }: ApiEndpointsProps) {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>("all-surahs")

  const toggleEndpoint = (id: string) => {
    setExpandedEndpoint(expandedEndpoint === id ? null : id)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard",
    })
  }

  const endpoints: Endpoint[] = [
    {
      id: "all-surahs",
      title: "Get All Surahs",
      description: "Returns a list of all surahs with basic information",
      method: "GET",
      path: "/api/quran",
      parameters: [
        {
          name: "lang",
          type: "string",
          required: false,
          description: "Language code (default: en)",
        },
      ],
      response: `{
  "language": "en",
  "available_languages": [
    { "code": "ar", "name": "Arabic", "nativeName": "العربية", "direction": "rtl" },
    { "code": "en", "name": "English", "nativeName": "English", "direction": "ltr" }
    // ...
  ],
  "surahs": [
    {
      "id": 1,
      "name": "الفاتحة",
      "transliteration": "Al-Fatihah",
      "translation": "The Opening",
      "type": "meccan",
      "total_verses": 7
    },
    // ...
  ]
}`,
    },
    {
      id: "specific-surah",
      title: "Get Specific Surah",
      description: "Returns a specific surah with all verses",
      method: "GET",
      path: "/api/quran/surah/{surah_id}",
      parameters: [
        {
          name: "surah_id",
          type: "number",
          required: true,
          description: "ID of the surah (1-114)",
        },
        {
          name: "lang",
          type: "string",
          required: false,
          description: "Language code (default: en)",
        },
      ],
      response: `{
  "language": "en",
  "id": 1,
  "name": "الفاتحة",
  "transliteration": "Al-Fatihah",
  "translation": "The Opening",
  "type": "meccan",
  "total_verses": 7,
  "verses": [
    {
      "id": 1,
      "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    },
    // ...
  ]
}`,
    },
    {
      id: "specific-verse",
      title: "Get Specific Verse",
      description: "Returns a specific verse from a surah",
      method: "GET",
      path: "/api/quran/surah/{surah_id}/verse/{verse_id}",
      parameters: [
        {
          name: "surah_id",
          type: "number",
          required: true,
          description: "ID of the surah (1-114)",
        },
        {
          name: "verse_id",
          type: "number",
          required: true,
          description: "ID of the verse",
        },
        {
          name: "lang",
          type: "string",
          required: false,
          description: "Language code (default: en)",
        },
      ],
      response: `{
  "language": "en",
  "surah": {
    "id": 1,
    "name": "الفاتحة",
    "transliteration": "Al-Fatihah",
    "translation": "The Opening"
  },
  "verse": {
    "id": 1,
    "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful."
  }
}`,
    },
    {
      id: "search",
      title: "Search",
      description: "Search for text in the Quran",
      method: "GET",
      path: "/api/quran/search",
      parameters: [
        {
          name: "q",
          type: "string",
          required: true,
          description: "Search query (minimum 3 characters)",
        },
        {
          name: "lang",
          type: "string",
          required: false,
          description: "Language code (default: en)",
        },
      ],
      response: `{
  "language": "en",
  "query": "mercy",
  "results": [
    {
      "surah": {
        "id": 1,
        "name": "الفاتحة",
        "transliteration": "Al-Fatihah",
        "translation": "The Opening"
      },
      "verses": [
        {
          "id": 1,
          "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful."
        }
      ]
    },
    // ...
  ],
  "total": 43
}`,
    },
    {
      id: "languages",
      title: "Get Available Languages",
      description: "Returns a list of all available languages",
      method: "GET",
      path: "/api/quran/languages",
      parameters: [],
      response: `{
  "languages": [
    { "code": "ar", "name": "Arabic", "nativeName": "العربية", "direction": "rtl" },
    { "code": "en", "name": "English", "nativeName": "English", "direction": "ltr" },
    { "code": "bn", "name": "Bengali", "nativeName": "বাংলা", "direction": "ltr" },
    // ...
  ]
}`,
    },
    {
      id: "audio-data",
      title: "Audio Recitations",
      description: "Audio recitation data is included with surah and verse responses",
      method: "GET",
      path: "/api/quran/surah/{surah_id}?lang={lang}",
      parameters: [
        {
          name: "surah_id",
          type: "number",
          required: true,
          description: "ID of the surah (1-114)",
        },
        {
          name: "lang",
          type: "string",
          required: false,
          description: "Language code (default: en)",
        },
      ],
      response: `{
"language": "en",
"id": 1,
"name": "الفاتحة",
"transliteration": "Al-Fatihah",
"translation": "The Opening",
"type": "meccan",
"total_verses": 7,
"audio": {
  "1": {
    "reciter": "Mishary Rashid Al-Afasy",
    "url": "https://server8.mp3quran.net/afs/001.mp3",
    "originalUrl": "https://server8.mp3quran.net/afs/001.mp3",
    "type": "complete_surah"
  },
  "2": {
    "reciter": "Abu Bakr Al-Shatri",
    "url": "https://server11.mp3quran.net/shatri/001.mp3",
    "originalUrl": "https://server11.mp3quran.net/shatri/001.mp3",
    "type": "complete_surah"
  },
  "3": {
    "reciter": "Nasser Al-Qatami",
    "url": "https://server6.mp3quran.net/qtm/001.mp3",
    "originalUrl": "https://server6.mp3quran.net/qtm/001.mp3",
    "type": "complete_surah"
  },
  "4": {
    "reciter": "Yasser Al-Dosari",
    "url": "https://server11.mp3quran.net/yasser/001.mp3",
    "originalUrl": "https://server11.mp3quran.net/yasser/001.mp3",
    "type": "complete_surah"
  }
},
"verses": [
  // ...
]
}`,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>Available endpoints for the Al-Quran API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {endpoints.map((endpoint) => (
            <div key={endpoint.id} className="border rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => toggleEndpoint(endpoint.id)}
              >
                <div>
                  <h3 className="font-medium">{endpoint.title}</h3>
                  <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      endpoint.method === "GET" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <Button variant="ghost" size="icon">
                    {expandedEndpoint === endpoint.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {expandedEndpoint === endpoint.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Endpoint</h4>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <code className="text-sm flex-1 break-all">
                            {baseUrl}
                            {endpoint.path}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(`${baseUrl}${endpoint.path}`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <a
                              href={`${baseUrl}${endpoint.path.replace(/{([^}]+)}/g, "1")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      {endpoint.parameters.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Parameters</h4>
                          <div className="bg-muted rounded-md overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="px-4 py-2 text-left">Name</th>
                                  <th className="px-4 py-2 text-left">Type</th>
                                  <th className="px-4 py-2 text-left">Required</th>
                                  <th className="px-4 py-2 text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.parameters.map((param, index) => (
                                  <tr
                                    key={param.name}
                                    className={index !== endpoint.parameters.length - 1 ? "border-b" : ""}
                                  >
                                    <td className="px-4 py-2 font-mono">{param.name}</td>
                                    <td className="px-4 py-2">{param.type}</td>
                                    <td className="px-4 py-2">{param.required ? "Yes" : "No"}</td>
                                    <td className="px-4 py-2">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium mb-2">Example Response</h4>
                        <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs">{endpoint.response}</pre>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = `${baseUrl}${endpoint.path.replace(/{([^}]+)}/g, "1")}?lang=en`
                            window.open(url, "_blank")
                          }}
                        >
                          Try it <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

export function ApiEndpoints(props: ApiEndpointsProps) {
  return (
    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
      <ApiEndpointsInner {...props} />
    </Suspense>
  )
}


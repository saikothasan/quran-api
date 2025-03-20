import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Book, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center mb-6 text-sm hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">About Multilingual Al-Quran API</CardTitle>
            <CardDescription>Learn more about this project and how to use it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-2">Project Overview</h2>
              <p className="text-muted-foreground">
                The Multilingual Al-Quran API is a RESTful API that provides access to the Holy Quran with translations
                in multiple languages. This project aims to make the Quran more accessible to speakers of different
                languages and developers who want to build applications that include Quranic content.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2">Supported Languages</h2>
              <p className="text-muted-foreground mb-2">The API currently supports the following languages:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Arabic (Original text)</li>
                <li>Bengali</li>
                <li>English</li>
                <li>Spanish</li>
                <li>French</li>
                <li>Indonesian</li>
                <li>Russian</li>
                <li>Swedish</li>
                <li>Turkish</li>
                <li>Urdu</li>
                <li>Chinese</li>
                <li>Transliteration</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2">Data Source</h2>
              <p className="text-muted-foreground">
                The Quran data is stored in JSON format in the public directory of this application. Each language has
                its own JSON file with the appropriate translations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2">API Usage</h2>
              <p className="text-muted-foreground mb-2">
                The API provides several endpoints to access Quran data in different languages:
              </p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>
                  Get available languages: <code className="bg-muted px-1">/api/quran/languages</code>
                </li>
                <li>
                  Get all surahs: <code className="bg-muted px-1">/api/quran?lang={"{language_code}"}</code>
                </li>
                <li>
                  Get a specific surah:{" "}
                  <code className="bg-muted px-1">
                    /api/quran/surah/{"{id}"}?lang={"{language_code}"}
                  </code>
                </li>
                <li>
                  Get a specific verse:{" "}
                  <code className="bg-muted px-1">
                    /api/quran/surah/{"{id}"}/verse/{"{verseId}"}?lang={"{language_code}"}
                  </code>
                </li>
                <li>
                  Search the Quran:{" "}
                  <code className="bg-muted px-1">
                    /api/quran/search?q={"{query}"}&lang={"{language_code}"}
                  </code>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button asChild>
                <Link href="/">
                  <Book className="mr-2 h-4 w-4" />
                  Try the API
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/search">
                  <Globe className="mr-2 h-4 w-4" />
                  Search in Multiple Languages
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

